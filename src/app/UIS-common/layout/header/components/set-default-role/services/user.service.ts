import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { User } from "../../edit-profile/models/user";
import { environment } from "src/environments/environment";
import { Persona } from "../../edit-profile/models/persona.model";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private snackbar: SnackbarService,
    private translate: TranslateService
  ) {}

  searchUsers(idRol, idPersona): Observable<User[]> {
    return this.http
      .get<User[]>(
        `${environment.urlBackCore}/usuario/search?idRol=${idRol}&idPersona=${idPersona}`
      )
      .pipe(
        catchError(() => {
          this.snackbar.show({
            mensaje: this.translate.instant(
              "MODULES.GENERAL.USUARIOS_ACCESOS.USUARIOS.ON_ERROR_SEARCH"
            ),
            tipo: "error",
          });
          return [];
        })
      );
  }

  enableUser(id: number): Observable<any> {
    return this.http
      .put(`${environment.urlBackCore}/usuario/enableUser?id=${id}`, null)
      .pipe(
        catchError(() => {
          this.snackbar.show({
            mensaje: this.translate.instant(
              "MODULES.GENERAL.USUARIOS_ACCESOS.USUARIOS.ON_ERROR_ACTIVATE"
            ),
            tipo: "error",
          });
          return [];
        })
      );
  }

  disableUser(id: number): Observable<any> {
    return this.http
      .put(`${environment.urlBackCore}/usuario/disableUser?id=${id}`, null)
      .pipe(
        catchError(() => {
          this.snackbar.show({
            mensaje: this.translate.instant(
              "MODULES.GENERAL.USUARIOS_ACCESOS.USUARIOS.ON_ERROR_DEACTIVATE"
            ),
            tipo: "error",
          });
          return [];
        })
      );
  }

  getUserById(id) {
    return this.http
      .get<User>(`${environment.urlBackCore}/usuario/byId?id=${id}`)
      .pipe(
        catchError(() => {
          this.snackbar.show({
            mensaje: this.translate.instant(
              "MODULES.GENERAL.USUARIOS_ACCESOS.USUARIOS.ON_404_USER"
            ),
            tipo: "error",
          });
          return [];
        })
      );
  }

  updateUserRoles(JSON) {
    return this.http
      .put(`${environment.urlBackCore}/usuario/editRoles`, JSON)
      .pipe(
        catchError((err) => {
          this.snackbar.show({
            mensaje: err.error.message,
            tipo: "error",
          });
          return [];
        })
      );
  }

  getAllPerson(query): Observable<User[]> {
    return this.http
      .get<User[]>(
        `${environment.urlBackCore}/vPersona/all/noUser/suggestionByNamesOrDocumento?filtro=${query}`
      )
      .pipe(
        catchError(() => {
          this.snackbar.show({
            mensaje: this.translate.instant(
              "MODULES.GENERAL.USUARIOS_ACCESOS.USUARIOS.ON_ERROR_GET_USERS"
            ),
            tipo: "error",
          });
          return [];
        })
      );
  }

  getPersonById(Id): Observable<Persona> {
    return this.http
      .get<Persona>(`${environment.urlBackCore}/persona/idPersona/${Id}`)
      .pipe(
        catchError(() => {
          this.snackbar.show({
            mensaje: this.translate.instant(
              "MODULES.GENERAL.USUARIOS_ACCESOS.USUARIOS.ON_ERROR_GET_PERSON_BY_ID"
            ),
            tipo: "error",
          });
          return [];
        })
      );
  }

  validateUserExists(userName: String) {
    return this.http.get(
      `${environment.urlBackCore}/usuario/isThereUserByNombreUsuario?nombreUsuario=${userName}`
    );
  }

  validatePersonHasUser(idPersona: number) {
    return this.http.get(
      `${environment.urlBackCore}/usuario/isThereUserByIdPersona?idPersona=${idPersona}`
    );
  }

  saveAllUsers(jsonBody) {
    return this.http
      .post(`${environment.urlBackCore}/usuario/saveAll`, jsonBody)
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.show({
              mensaje: this.translate.instant(
                "MODULES.GENERAL.USUARIOS_ACCESOS.USUARIOS.ON_ERROR_ASSINGN_USERS"
              ),
              tipo: "warning",
            });
          }
          return [];
        })
      );
  }

  updateUserRol(
    id: number,
    idRol: number,
    nombre: string,
    fechaDesde: string,
    fechaHasta: string
  ) {
    const jsonBody = {
      id: id,
      idRol: idRol,
      nombre: nombre,
      fechaDesde: fechaDesde,
      fechaHasta: fechaHasta,
    };
    return this.http.put(
      `${environment.urlBackCore}/usuario/updateUserRol`,
      jsonBody
    );
  }

  assignUserRoles(jsonBody) {
    return this.http
      .post(`${environment.urlBackCore}/usuario/saveUserRol`, jsonBody)
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.show({
              mensaje: this.translate.instant(
                "MODULES.GENERAL.USUARIOS_ACCESOS.ROLES_TIPOS_ROLES.ON_NOT_CHANGES_SAVE_ROL"
              ),
              tipo: "warning",
            });
          }
          return [];
        })
      );
  }
  //TODO: Mostrar un mensaje mas acorde
  getRolRecordHistory(idUsuario, idRol) {
    return this.http
      .get(
        `${environment.urlBackCore}/usuario/recordHistory?idUsuario=${idUsuario}&idRol=${idRol}`
      )
      .pipe(
        catchError(() => {
          this.snackbar.show({
            mensaje: this.translate.instant(
              "MODULES.GENERAL.USUARIOS_ACCESOS.USUARIOS.ON_ERROR_SEARCH"
            ),
            tipo: "error",
          });
          return [];
        })
      );
  }

  deleteRolToUser(idUserRol) {
    return this.http
      .delete(`${environment.urlBackCore}/usuario?idUserRol=${idUserRol}`)
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }

  checkEmail(id: number) {
    const headers = new HttpHeaders().set(
      "Content-Type",
      "text/plain; charset=utf-8"
    );
    return this.http
      .get(
        `${environment.urlBackCorePublic}/changePassword/checkEmail?idUser=${id}`,
        { headers, responseType: "text" }
      )
      .pipe(
        catchError(() => {
          return "n";
        })
      );
  }

  generatePassword(id: number) {
    let headers = new HttpHeaders({
      environment: environment.name,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    let options = { headers: headers };
    return this.http
      .post(
        `${environment.urlBackCorePublic}/changePassword/generatePassword?idUser=${id}`,
        null,
        options
      )
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.show({
              mensaje: this.translate.instant(
                "El usuario no tiene asociado ningún correo"
              ),
              tipo: "warning",
            });
          }
          return [];
        })
      );
  }
}
