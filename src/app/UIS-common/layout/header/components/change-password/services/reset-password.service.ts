import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { LayoutState } from "../../../../store/layout-store.model";
import { catchError, takeUntil } from "rxjs";
import { environment } from "src/environments/environment";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { UnsubscriptorService } from "@UIS-common/layout/core/unsubscriptor-service/base-unsubscriptor";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ResetPasswordService extends UnsubscriptorService {
  idPerson: number;
  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private store: Store<LayoutState>,
    private translate: TranslateService
  ) {
    super();
    this.store
      .select("person")
      .pipe(takeUntil(this.unSubscriptor$))
      .subscribe((personData) => {
        if (!personData) {
          return;
        }
        this.idPerson = personData.ID;
      });
  }

  changePassword(
    idUsuario: number,
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    const headers = new HttpHeaders({
      environment: environment.name,
    });
    return this.http
      .put<boolean>(
        `${environment.urlBackCore}/usuario/changePassword`,
        {
          idPersona: this.idPerson,
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        { headers }
      )
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbarService.show({
              mensaje: this.translate.instant(
                "GENERAL_PAGES_FROM_LAYOUT.CHANGE_PASSWORD.ERRORS.MESSAGE"
              ),
              tipo: "warning",
            });
          }
          return [];
        })
      );
  }
}
