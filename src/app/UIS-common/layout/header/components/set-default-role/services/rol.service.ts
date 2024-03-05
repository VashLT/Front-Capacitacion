import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { Rol } from "../models/rol";
import { environment } from "src/environments/environment";
import { TipoRol } from "../models/tipo-rol";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import {
  Menu,
  UpdateObject,
} from "@UIS-common/layout/custom-menu-panel/models/models";

@Injectable()
export class RolService {
  constructor(
    private http: HttpClient,
    private snackbar: SnackbarService,
    private translate: TranslateService
  ) {}

  getAllTipoRol(idTipoRol: number): Observable<Rol[]> {
    return this.http
      .get<Rol[]>(
        `${environment.urlBackCore}/rol/byIdTipoRol?idTipoRol=${idTipoRol}`
      )
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }

  getAllRol(): Observable<Rol[]> {
    return this.http
      .get<Rol[]>(`${environment.urlBackCore}/rol/byIdTipoRol?idTipoRol=`)
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }

  updateMenus(rtmObjetct: UpdateObject[]) {
    return this.http.put(`${environment.urlBackCore}/rtm`, rtmObjetct).pipe(
      catchError((err) => {
        if (err) {
          this.snackbar.showBackError(err);
        }
        return [];
      })
    );
  }

  getAllMenus() {
    return this.http
      .get<Menu[]>(
        `${environment.urlBackCore}/rolRutaNavegacion/assignedRoutesByRol/3`
      )
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }

  getRightTopMenus() {
    return this.http
      .get<Menu[]>(`${environment.urlBackCore}/rolRutaNavegacion/allRtm`)
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }

  createRol(Rol: Rol) {
    return this.http.post(`${environment.urlBackCore}/rol`, Rol).pipe(
      catchError((err) => {
        if (err) {
          this.snackbar.showBackError(err);
        }
        return [];
      })
    );
  }

  updateRol(
    idRol: number,
    Nombre: String,
    description: String,
    idTipoRol: number
  ) {
    return this.http
      .put(`${environment.urlBackCore}/rol`, {
        id: idRol,
        nombre: Nombre,
        descripcion: description,
        idTipoRol: idTipoRol,
      })
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }

  getRolesList(idAssignedList: Rol[], idTipoRolList: TipoRol[]) {
    return this.http
      .post(`${environment.urlBackCore}/rol/all/byIds/exceptAssigned`, {
        idAssignedList: idAssignedList,
        idTipoRolList: idTipoRolList,
      })
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }

  deleteRole(id: number) {
    return this.http.delete(`${environment.urlBackCore}/rol?idRol=${id}`).pipe(
      catchError((err) => {
        if (err) {
          this.snackbar.showBackError(err);
        }
        return [];
      })
    );
  }

  getrolUnassignamend(jsonBody) {
    return this.http
      .post(`${environment.urlBackCore}/usuario/rolUnassignamend`, jsonBody)
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }

  getRolesByUser(idUser) {
    return this.http
      .get(`${environment.urlBackCore}/usuario/roles?idUser=${idUser}`)
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }
  //TODO: Agregar traducciones
  setDefaultUserRol(idUserRol) {
    return this.http
      .put(
        `${environment.urlBackCore}/usuario/defaultRol?idUserRol=${idUserRol}`,
        {}
      )
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }
}
