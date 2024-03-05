import { getParametros } from "./../../store/parametros/parametros.actions";
import { Injectable } from "@angular/core";
import { take, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { LayoutState } from "../../store/layout-store.model";
import { getUserData } from "../../store/user/user-data.actions";
import { getRolData } from "../../store/roles/roles-data.actions";
import { getPersonData } from "../../store/person/person-data.actions";
import { environment } from "src/environments/environment";
import { ParametrosService } from "../../shared/services/parametros/parametros.service";
@Injectable()
export class StartupService {
  /**
   * Constructor del servicio
   *
   * @param store - store de Redux
   * @param parametros  - Servicio de parámetros
   */
  constructor(
    private store: Store<LayoutState>,
    private parametros: ParametrosService
  ) {}

  /**
   * Despacha las acciones en Redux correspondientes a los datos del usuario, persona y roles
   * @returns func async que se ejecuta para inicializar la aplicación
   */
  load(): Promise<boolean> {
    let promise = new Promise<boolean>((resolve, _reject) => {
      this.store.dispatch(getUserData());
      this.store.dispatch(getPersonData());
      this.store.dispatch(getRolData());
      this.store.dispatch(getParametros());

      /**
       * Hasta que no se carguen los datos del usuario no se resuelve la promesa
       */
      this.store
        .select("user")
        .pipe(
          /**
           * toma solo la primera respuesta
           */
          take(1),
          tap((data) => {
            if (data) {
              return resolve(true);
            } else {
              /**
               * check: https://stackoverflow.com/a/57949518
               */
              const inLocal = Boolean(
                window.location.hostname === "localhost" ||
                  /**
                   * [::1] is the IPv6 localhost address.
                   */
                  window.location.hostname === "[::1]" ||
                  /**
                   * 127.0.0.1/8 is considered localhost for IPv4.
                   */
                  window.location.hostname.match(
                    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
                  )
              );
              if (!inLocal) {
                const urlParts = window.location.href.split("/");
                /**
                 * redirect to the login
                 */
                window.location.href =
                  urlParts[0] + // domain
                  "//" +
                  urlParts[2] +
                  (!environment.production ? "/" + urlParts[3] : "") +
                  "/auth/#/login";
              } else {
                console.log(`
No fue posible obtener los datos del usuario, esto se puede deber a:
  
  - Se venció o no se encuentra el authToken
  - El authToken no coincide al de su environment correspondiente (predev, develop, ...), verificar endpoint

`);
              }
            }
          })
        )
        .subscribe();
    });

    return promise;
  }
}
