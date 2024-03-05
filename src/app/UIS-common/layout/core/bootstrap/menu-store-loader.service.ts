import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as menuActions from "../../store/menu/menu-data.actions";
import { LayoutState } from "../../store/layout-store.model";
import { projectEnvironments } from "src/project-config/project-envs";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { redirectToAuth } from "src/environments/utils/utils-not-mf";
import { Router } from "@angular/router";

@Injectable()
export class MenuStoreLoaderService {
  constructor(
    private store: Store<LayoutState>,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  /**
   * Carga los menús de navegación en el store (Redux)
   * @returns estado de la operacion de carga de menus
   */
  loadStore() {
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

    let slug = projectEnvironments.slug;

    if (!localStorage.getItem("idRol")) {
      if (inLocal) {
        this.snackbar.show({
          mensaje:
            "No se encontró el id del rol seleccionado (idRol) en el localStorage",
          tipo: "warning",
        });
      } else {
        /**
         * redirecciona a las locetas
         */
        this.goToAuth();
      }
      return false;
    }
    if (!localStorage.getItem("authToken")) {
      if (inLocal) {
        this.snackbar.show({
          mensaje:
            "No se encontró el token de autorización (authToken) en el localStorage",
          tipo: "warning",
        });
      } else {
        /**
         * redirecciona a las locetas
         */
        this.goToAuth();
      }
      return false;
    }

    this.store.dispatch(menuActions.loadMenus({ slug }));
    return true;
  }

  /**
   * Método para redirigir a rutas del proyecto de auth
   * @param complement vista a la que redirije
   */
  goToAuth() {
    redirectToAuth(this.router);
  }
}
