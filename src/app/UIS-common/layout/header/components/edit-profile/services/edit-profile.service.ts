import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { LayoutState } from "../../../../store/layout-store.model";
import { environment } from "src/environments/environment";
import { PersonData } from "../../../../store/person/person-data.model";
import { UnsubscriptorService } from "@UIS-common/layout/core/unsubscriptor-service/base-unsubscriptor";
import { takeUntil } from "rxjs";

@Injectable()
export class EditProfileService extends UnsubscriptorService {
  personData: PersonData;
  constructor(private http: HttpClient, private store: Store<LayoutState>) {
    super();
    this.store
      .select("person")
      .pipe(takeUntil(this.unSubscriptor$))
      .subscribe((data) => {
        if (!data) {
          return;
        }
        this.personData = data;
      });
  }

  editProfile(
    primerNombre: string,
    segundoNombre: string,
    primerApellido: string,
    segundoApellido: string,
    correoPersonal: string,
    firmaB64: string,
    password: string,
    correoInstitucional: string
  ) {
    const headers = new HttpHeaders({
      environment: environment.name,
    });
    return this.http.put<boolean>(
      `${environment.urlBackCore}/persona/editProfile`,
      {
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        correoPersonal,
        password,
        firmaB64,
        correoInstitucional,
      },
      { headers }
    );
  }

  editProfileNoPass(
    primerNombre: string,
    segundoNombre: string,
    primerApellido: string,
    segundoApellido: string,
    correoPersonal: string
  ) {
    const editUser = {
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      correoPersonal: correoPersonal,
    };
    const headers = new HttpHeaders({
      environment: environment.name,
    });
    return this.http.put<boolean>(
      `${environment.urlBackCore}/persona/editProfile`,
      editUser,
      { headers }
    );
  }
}
