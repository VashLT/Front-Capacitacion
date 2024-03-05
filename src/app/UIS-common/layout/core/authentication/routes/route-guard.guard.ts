import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { RoutesService } from "./routes.service";

/**
 * Guardian de los permisos sobre las rutas.
 */
@Injectable()
export class RouteGuard {
  /**
   * Constructor del guard.
   *
   * @param routeService - Servicio de rutas.
   */
  constructor(private routeService: RoutesService) {}

  /**
   * Función para ver si un hijo puede cargarse.
   *
   * @param childRoute - Ruta hija.
   * @param state - Estado de la ruta.
   * @returns - Observable<boolean> con el resultado de la validación.
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const splitRoutes = state.url?.split("?");
    const urlWithoutQueryParams = splitRoutes ? splitRoutes[0] : null;
    if (
      childRoute.routeConfig.hasOwnProperty("loadChildren") ||
      childRoute.routeConfig.hasOwnProperty("children")
    ) {
      /**
       * Si es un cambio de ruta pasando por un padre dejo pasar, solo valido rutas finales.
       */
      return of(true);
    } else {
      return this.routeService.havePermissions(
        urlWithoutQueryParams,
        childRoute?.routeConfig?.data?.childOf || childRoute?.data?.childOf
      );
    }
  }
}
