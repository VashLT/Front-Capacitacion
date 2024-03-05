import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Injector, Optional } from "@angular/core";
import { Router } from "@angular/router";
import {
  combineLatest,
  debounceTime,
  filter,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from "rxjs";
import { MenuService } from "../../bootstrap/menu.service";
import { ProvideDefaultsRoutesService } from "./provide-defaults-routes.service";
import { APP_BASE_HREF } from "@angular/common";

/**
 * Servicio para validación de rutas.
 */
@Injectable()
export class RoutesService {
  /**
   * Constructor del servicio.
   *
   * @param router - Enrutador de Angular.
   * @param http - Servicio de http.
   */
  constructor(
    private router: Router,
    private http: HttpClient,
    private provideDefaultsRoutesService: ProvideDefaultsRoutesService,
    private menuService: MenuService,
    @Optional() @Inject(APP_BASE_HREF) private base: string,
    private injector: Injector
  ) {}

  /**
   * Función para validar si se tienen permisos localmente o no.
   *
   * @param routeToLoad - Ruta próxima a cargarse
   * @returns - Observable<boolean> con el resultado de si tiene permisos localmente o no.
   */
  private validateLocalServices(
    routeToLoad: string,
    relatedRoutes: string[]
  ): Observable<boolean> {
    const haveLocalPermissions = (menus) => {
      const menusPlain = JSON.stringify(menus);
      /** Regex para validar rutas de navegación */
      const routeRegex = /"route":"(?<route>((.*?))(?=",))/g;
      let match: RegExpExecArray;
      let firstValidation = false;

      /** itera las coincidencias */
      while ((match = routeRegex.exec(menusPlain))) {
        /** Borra este campo del match ya que no se utiliza */
        delete match.input;
        try {
          /** Cada ruta es evaluada como regex (así no sean regex) de la siguiente manera:
           * /^ruta$/
           */
          if (new RegExp(`^${match[1]}$`).test(routeToLoad)) {
            firstValidation = true;
            break;
          }
        } catch (_) {
          continue;
        }
      }

      return Array.isArray(relatedRoutes)
        ? relatedRoutes.reduce(
            (prev, next) => menusPlain.includes(next) || prev,
            firstValidation
          )
        : firstValidation;
    };

    return combineLatest([
      this.menuService.getAll(),
      this.menuService.getMenuUserAll(),
    ]).pipe(
      filter(([menus, _]) => menus?.length > 0),
      take(2),
      map((res) => (Array.isArray(res) ? haveLocalPermissions(res) : false))
    );
  }

  /**
   * Método para validar si se tiene permisos de acceder a una ruta.
   *
   * @param routeToLoad - Ruta próxima a cargarse
   * @returns - Observable con el resultado de si tiene permisos o no.
   */
  havePermissions(
    routeToLoad: string,
    relatedRoutes: string[]
  ): Observable<boolean> {
    try {
      this.base = this.injector.get(APP_BASE_HREF);
    } catch (_error) {}
    routeToLoad = routeToLoad.replace(this.base ? "/" + this.base : "", "");
    return routeToLoad !== this.provideDefaultsRoutesService.homePageUrl
      ? this.validateLocalServices(routeToLoad, relatedRoutes).pipe(
          debounceTime(50),
          switchMap((localValidation) =>
            !localValidation
              ? of(false)
              : this.validateRemoteServices(routeToLoad, relatedRoutes)
          ),
          tap((res) => {
            if (
              !res &&
              routeToLoad !== this.provideDefaultsRoutesService.pageNotFound &&
              routeToLoad !== this.provideDefaultsRoutesService.homePageUrl
            ) {
              this.router.navigate(
                [this.provideDefaultsRoutesService.pageNotFound],
                {
                  skipLocationChange: true,
                }
              );
            }
          })
        )
      : of(true);
  }

  /**
   * Método que valida los servicios de forma remota.
   *
   * @param routeToLoad - Ruta próxima a cargarse
   * @returns - Observable<boolean> con el resultado de si tiene permisos o no.
   */
  // eslint-disable-next-line unused-imports/no-unused-vars
  validateRemoteServices(routeToLoad: string, relatedRoutes: string[]) {
    // return this.http
    //   .get<boolean>(`?url=${routeToLoad}`)
    //   .pipe(catchError(() => of(false)));
    return of(true);
  }
}
