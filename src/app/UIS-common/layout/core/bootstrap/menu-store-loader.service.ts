import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as menuActions from "../../store/menu/menu-data.actions";
import { LayoutState } from "../../store/layout-store.model";
import { projectEnvironments } from "src/project-config/project-envs";
import { redirectToAuth } from "src/environments/utils/utils-not-mf";
import { Router } from "@angular/router";

@Injectable()
export class MenuStoreLoaderService {
  constructor(
    private store: Store<LayoutState>,
    private router: Router
  ) { }

  /**
   * Carga los menús de navegación en el store (Redux)
   * @returns estado de la operacion de carga de menus
   */
  loadStore() {
    let slug = projectEnvironments.slug;

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
