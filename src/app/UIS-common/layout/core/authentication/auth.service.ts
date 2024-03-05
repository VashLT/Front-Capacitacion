import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, switchMap, takeUntil, tap } from "rxjs/operators";
import { TokenService } from "./token.service";
import { Token, User } from "./interface";
import { guest } from "./user";
import { ImageService } from "../../header/components/edit-image/services/image.service";
import { Store } from "@ngrx/store";
import { LayoutState } from "../../store/layout-store.model";
// import { environment } from "src/environments/environment";
import { UserData } from "../../store/user/user-data.model";
import { PersonData } from "../../store/person/person-data.model";
import { RolData } from "../../store/roles/roles-data.model";
// import { STARTUP_ENDPOINT } from "../../constants/startup-endpoint";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { UnsubscriptorService } from "../unsubscriptor-service/base-unsubscriptor";
import { redirectToAuth } from "src/environments/utils/utils-not-mf";
import { clearMenusData } from "@UIS-common/layout/store/menu/menu-data.actions";
import { Router } from "@angular/router";
import { mockPersonaResponse } from "@UIS-common/layout/store/mocks/persona.mock";
import { mockRolesResponse } from "@UIS-common/layout/store/mocks/roles.mock";
import { mockUserResponse } from "@UIS-common/layout/store/mocks/user.mock";

@Injectable()
export class AuthService extends UnsubscriptorService {
  private user$ = new BehaviorSubject<User>(guest);

  private userReq$ = this.http.get<User>("/me");

  userData: UserData;
  personData: PersonData;
  rolesData: RolData[];

  constructor(
    private snackbar: SnackbarService,
    private http: HttpClient,
    private router: Router,
    private token: TokenService,
    private ImageService: ImageService,
    private store: Store<LayoutState>
  ) {
    super();
    this.token
      .change()
      .pipe(switchMap(() => (this.check() ? this.userReq$ : of(guest))))
      .subscribe((user) => this.user$.next(Object.assign({}, guest, user)));

    this.token
      .refresh()
      .pipe(switchMap(() => this.refresh()))
      .subscribe();

    this.store
      .select("person")
      .pipe(takeUntil(this.unSubscriptor$))
      .subscribe((personData) => {
        if (!personData) {
          return;
        }
        //establecer foto del usuario si existe
        if (personData.ID_FOTO_USUARIO) {
          this.getFotoUsr(personData.ID_FOTO_USUARIO);
        }
      });
  }

  check() {
    return this.token.valid();
  }

  getUserData() {
    // return this.http.get<any>(STARTUP_ENDPOINT).pipe(
    //   catchError((error) => {
    //     if (error?.status == 401) {
    //       this.logout();
    //       throw new Error(error.message ?? "Usuario no autorizado");
    //     }
    //     return of(null);
    //   })
    // );
    return of(mockUserResponse);
  }

  getPersonData() {
    // return this.http
    //   .get<any>(`${environment.urlBackAuth}/users/person`)
    //   .pipe(catchError((_) => of(null)));
    return of(mockPersonaResponse);
  }

  getRolesData() {
    // return this.http
    //   .get<any>(`${environment.urlBackAuth}/users/roles`)
    //   .pipe(catchError((_) => of(null)));
    return of(mockRolesResponse);
  }

  getUserRol(roles: any[], id: string | number): string {
    let rol = "NO DEFINIDO";
    roles.every((item) => {
      if (item.ID !== id) {
        return true;
      }
      rol = item.NOMBRE;
      return false;
    });
    return rol;
  }

  login(email: string, password: string, rememberMe = false) {
    return this.http
      .post<Token>("/auth/login", {
        email,
        password,

        remember_me: rememberMe,
      })
      .pipe(
        tap((token) => this.token.set(token)),
        map(() => this.check())
      );
  }

  refresh() {
    return this.http.post<Token>("/auth/refresh", {}).pipe(
      tap((token) => this.token.set(token, true)),
      map(() => this.check())
    );
  }

  logout() {
    /**
     * Clear Redux store, other data is clear when redirect to auth
     */
    this.store.dispatch(clearMenusData());
    /**
     * Clear localStorage
     */
    localStorage.clear();

    redirectToAuth(this.router);
  }

  getFotoUsr(idFoto: number) {
    this.ImageService.downloadFile(idFoto).subscribe({
      next: async (foto: Blob) => {
        if (foto) {
          const image = await this.blobToBase64(foto);
          this.ImageService.next(image);
          this.user$.value.avatar = image;
        }
      },
      error: (err) => {
        this.snackbar.showBackError(err);
      },
    });
  }

  blobToBase64(blob: Blob) {
    return new Promise<string>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
