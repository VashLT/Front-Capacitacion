import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, of } from "rxjs";
import { environment } from "src/environments/environment";

/**
 * Servicio para obtener las acciones disponibles para el rol actual en alguna seccion.
 */
@Injectable({
  providedIn: "root",
})
export class RolActionsService {
  /**
   * Constructor del servicio.
   *
   * @param http - Servicio de http.
   */
  constructor(private http: HttpClient) {}

  /**
   * Función que obtiene las acciones disponibles para un rol en una sección.
   *
   * @param section - Sección actual.
   * @returns - Json con las acciones a las cuales tiene acceso.
   */
  getActionsBySection(section: string) {
    return this.http
      .get<{ [key: string]: boolean }>(
        `${environment.urlBackCore}/rolAcciones/getPermission?slug=${section}`,
        {
          headers: {
            "SIMULATE-LOADER": "NONGET",
          },
        }
      )
      .pipe(
        catchError(() => of({ permission: {} })),
        map((res) => res?.permission as any)
      );
  }
}
