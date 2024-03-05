import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, filter, map, mergeMap } from "rxjs/operators";
import {
  loadMenus,
  loadMenusSuccess,
  loadMenusError,
} from "./menu-data.actions";
import { CurrentNavigation, RawMenuModel } from "./menu-data.model";
import { Menu } from "../../core/bootstrap/models/menu.model";
import { MenuDataService } from "./menu-data.service";
import { UnsubscriptorService } from "@UIS-common/layout/core/unsubscriptor-service/base-unsubscriptor";
import { projectEnvironments } from "src/project-config/project-envs";
import { redirectToAuth } from "src/environments/utils/utils-not-mf";
import { Router } from "@angular/router";

@Injectable()
export class MenuEffect extends UnsubscriptorService {
  constructor(
    private actions$: Actions,
    private menuDataService: MenuDataService,
    private router: Router
  ) {
    super();
  }

  loadMenusEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadMenus),
        filter((act) => act.slug === projectEnvironments.slug),
        mergeMap((action) =>
          this.menuDataService.getMenuData(action.slug).pipe(
            map((currentNavigation: CurrentNavigation) => {
              /**
               * rawMenus = currentNavigation
               * temporalmente sigue asignando currentNavigation
               */
              localStorage.setItem(
                "currentNavigation",
                JSON.stringify(currentNavigation)
              );
              /**
               * El usuario no tiene permisos para ningún menú
               */
              if (
                Object.keys(currentNavigation).length === 0 ||
                currentNavigation.SIDE_MENU.length === 0
              ) {
                /**
                 * Redirecciona a las locetas
                 */
                this.goToAuth();
              }
              let [rolMenus, parents] = this.parseMenus(
                currentNavigation.SIDE_MENU[0]
              );
              this.menuDataService.menuParents = parents;
              let userMenus = [];

              if (currentNavigation.USER_MENU.length > 0) {
                let userParents;
                [userMenus, userParents] = this.parseMenus(
                  currentNavigation.USER_MENU[0]
                );
                /**
                 * Asigna la lista de menus para cada ruta
                 * esto se utiliza en el breadcrumb
                 */
                this.menuDataService.menuParents = {
                  ...this.menuDataService.menuParents,
                  ...userParents,
                };
              }
              /**
               * la carga de menus ha sido exitosa y despacha otra acción
               */
              return loadMenusSuccess({
                rolMenus,
                userMenus,
                rightTopMenus: currentNavigation.RIGHT_TOP_MENU,
                slug: currentNavigation.SLUG,
              });
            }),
            catchError((error) => {
              console.error(error);
              return of(loadMenusError());
            })
          )
        )
      ),
    { dispatch: true }
  );

  /**
   * Le da formato a los menus y los parsea para su uso en frontend
   * @param rawMenus (currentNavigation) arbol de menus sin formatear
   * @returns menus formateados
   */
  parseMenus(rawMenus: RawMenuModel): (Menu[] | any)[] {
    let menuParents = {};
    let navigation = JSON.parse(
      JSON.stringify(rawMenus)
        .replace(/"ICONO":/g, `"icon":`)
        .replace(/"HIJOS":/g, `"children":`)
        .replace(/"RUTA":/g, `"route":`)
        .replace(/"NOMBRE":/g, `"name":`),
      (k, v) => {
        if (
          [
            "ACTIVO",
            "CREADO",
            "MODIFICADO",
            "ID_PADRE",
            "MODULO_DIRECTO",
            "type",
            "class",
          ].includes(k)
        ) {
          return undefined;
        }
        if (k === "children" && (!v.length || v === "[]")) {
          return undefined;
        }
        if (k === "icon") {
          if (!v?.length) {
            v = undefined;
          } else {
            return JSON.parse(v).value;
          }
        }
        if (k === "route" && v === "#") {
          return "";
        }
        return v;
      }
    );
    navigation.route = "/";
    navigation = this.buildChildren(navigation, [], menuParents);

    return [
      [
        {
          type: "base",
          route: "/",
          name: navigation.name,
          icon: navigation.icon,
          label: navigation.label,
        },
        ...(navigation.children ?? []),
      ],
      menuParents,
    ];
  }

  /**
   * Método para redirigir a rutas del proyecto de auth
   */
  goToAuth() {
    redirectToAuth(this.router);
  }

  /**
   * Con base en el rol seleccionado por el usuario, filtra los menus y
   * le asigna a cada menu hijo sus padres y les modifica campos para su uso en el sidebar
   * @param navigation ruta de navegación (menu)
   * @param parents padres del menú
   * @param menuParents referencia a un objeto con el cual se aplana el arbol de menus
   * @returns
   */
  private buildChildren(navigation, parents = [], menuParents = {}) {
    navigation.type = navigation.children?.length ? "sub" : "link";
    parents = [
      ...parents,
      {
        type: navigation.type,
        route: navigation.route,
        name: navigation.name,
      },
    ];
    menuParents[navigation.route] = parents;
    if (navigation.children?.length) {
      navigation.children = navigation.children.map((value) =>
        this.buildChildren(value, parents, menuParents)
      );
    }
    return navigation;
  }
}
