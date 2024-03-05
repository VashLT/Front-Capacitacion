import { TranslateService } from "@ngx-translate/core";
import { Menu } from "../bootstrap/models/menu.model";
import { Injectable, Injector } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import {
  BehaviorSubject,
  filter,
  lastValueFrom,
  map,
  Observable,
  switchMap,
  take,
  takeUntil,
  tap,
} from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import { ProvideDefaultsRoutesService } from "../authentication/routes/provide-defaults-routes.service";
import { LayoutState } from "../../store/layout-store.model";
import { APP_BASE_HREF } from "@angular/common";
import { UnsubscriptorService } from "../unsubscriptor-service/base-unsubscriptor";

/**
 * Servicio para manejar lo relacionado con el seo de la app, inicialmente solo será el titulo de la página.
 */
@Injectable()
export class SeoService extends UnsubscriptorService {
  /**
   * Observable del menú actual seleccionado.
   */
  private currentMenu$: BehaviorSubject<Menu> = new BehaviorSubject(null);

  /**
   * Constructor del servicio.
   *
   * @param store - Store para obtener los menús.
   * @param title - Servicio para manejar el titulo de la página.
   */
  constructor(
    private store: Store<LayoutState>,
    private title: Title,
    private router: Router,
    private defaultRoutesConfig: ProvideDefaultsRoutesService,
    private translate: TranslateService,
    private injector: Injector
  ) {
    super();
  }

  /**
   * Función para obtener una lista de menús aplanados, sin hijos.
   *
   * @param menus - Menús a aplanar.
   * @returns - Menús aplanados.
   */
  private flatMenus(menus: Menu[]): Menu[] {
    const flatMenus: Menu[] = [];
    menus.forEach((menu) => {
      flatMenus.push(menu);
      if (menu.children) {
        flatMenus.push(...this.flatMenus(menu.children as any));
      }
    });
    return flatMenus;
  }

  /**
   * Función para obtener el observable del menú ligado a una url.
   *
   * @param urlToFind - Url a buscar en el menú.
   * @returns - Menu encontrado.
   */
  private getObservableMenuFound(urlToFind: string) {
    urlToFind = this.fixUrlToFind(urlToFind);
    return this.getObservableAllMenus().pipe(
      map((menus) =>
        menus.find(
          (menu) =>
            menu.route === urlToFind &&
            urlToFind !== this.defaultRoutesConfig.homePageUrl &&
            urlToFind !== "/"
        )
      )
    );
  }

  /**
   * Función que remueve la base href de la url.
   *
   * @param urlToFind - Url a arreglar.
   * @returns - Url sin la base href.
   */
  private fixUrlToFind(urlToFind: string) {
    let baseUrl;
    try {
      baseUrl = this.injector.get(APP_BASE_HREF);
    } catch (error) {}
    if (baseUrl) {
      urlToFind = urlToFind.replace("/" + baseUrl, "");
    }
    return urlToFind;
  }

  /**
   * Función para obtener el observable de todos los menús aplanados.
   * Se subscribe a la store de menús y mediante una función recursiva se aplanan los menús.
   *
   * @returns - Observable de todos los menús.
   */
  private getObservableAllMenus(): Observable<Menu[]> {
    return this.store.select("currentNavigation").pipe(
      map((currentNavigation) => {
        if (currentNavigation) {
          return this.flatMenus([
            ...currentNavigation.rolMenus,
            ...currentNavigation.userMenus,
          ]).map((el) => ({
            ...el,
            children: null,
          }));
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Función para obtener los datos del menú actual que permitirán cambiar el título de la página.
   *
   * @returns - Observable con los datos del menú actual y el padre principal del módulo actual.
   */
  private getDataTochangeTitle() {
    return this.getFirstParentMenu().pipe(
      takeUntil(this.unSubscriptor$),
      switchMap((menuParent) =>
        this.getCurrentMenu().pipe(
          takeUntil(this.unSubscriptor$),
          map((currentMenu) => ({
            parent: menuParent,
            currentMenu,
          }))
        )
      )
    );
  }

  /**
   * Función para obtener el título concatenado.
   *
   * @param section - Sección sobre la que me encuentro.
   * @param module - Módulo sobre el que me encuentro.
   * @returns - String con el título que tendrá la página.
   */
  private getNameTitle(section: string, module: string) {
    return this.translate.instant(
      "GENERAL_PAGES_FROM_LAYOUT.SEO.TITLE_STRUCTURE",
      {
        section,
        module,
      }
    );
  }

  /**
   * Función para cambiar el título de la página en caso de que sea una página 404 o home.
   *
   * @param module - Módulo sobre el que me encuentro.
   */
  private setTitleOn404OrHome(module: string) {
    const url = this.fixUrlToFind(this.router.url);
    if (url === "/not-found") {
      this.title.setTitle(
        this.getNameTitle(
          this.translate.instant(
            "GENERAL_PAGES_FROM_LAYOUT.SEO.NOT_FOUND_OR_NOT_ACCESS_TITLE"
          ),
          module
        )
      );
    }
    if (url === this.defaultRoutesConfig.homePageUrl || url === "/") {
      this.title.setTitle(
        this.getNameTitle(
          this.translate.instant("GENERAL_PAGES_FROM_LAYOUT.SEO.HOME_TITLE"),
          module
        )
      );
    }
  }

  /**
   * Función para inicializar el servicio.
   * Se subscribe a los cambios de ruta y a los cambios del menú para cambiar el título de la página.
   */
  init() {
    this.subscribeToRouteChanges();
    this.getDataTochangeTitle().subscribe((menu) => {
      if (menu.currentMenu && menu.parent) {
        this.title.setTitle(
          this.getNameTitle(menu.currentMenu.name, menu.parent.name)
        );
      } else if (!menu.currentMenu && menu.parent) {
        this.setTitleOn404OrHome(menu.parent.name);
      }
    });
  }

  /**
   * Función para cambiar el título de una paǵina.
   *
   * @param module - Módulo sobre el que me encuentro.
   * @param section - Sección sobre la que me encuentro.
   */
  async setTitle(section: string) {
    const module = await lastValueFrom(
      this.getFirstParentMenu().pipe(
        take(1),
        map((el) => el?.name)
      )
    );
    this.title.setTitle(this.getNameTitle(section, module));
  }

  /**
   * Función que se subscribe a los cambios de ruta.
   */
  subscribeToRouteChanges() {
    this.router.events
      .pipe(
        takeUntil(this.unSubscriptor$),
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => {
          /**
           * Para quitar los query params de la url.
           */
          try {
            return event.urlAfterRedirects
              ? event.urlAfterRedirects?.split("?")[0]
              : event.url?.split("?")[0];
          } catch (error) {
            console.error(error);
            return event.urlAfterRedirects ?? event.url;
          }
        }),
        switchMap((url) => this.getObservableMenuFound(url)),
        tap((menu) => {
          this.currentMenu$.next(menu);
        })
      )
      .subscribe();
  }

  /**
   * Función para obtener el observable del menú actual.
   *
   * @returns - Observable del menú actual.
   */
  getCurrentMenu() {
    return this.currentMenu$.asObservable();
  }

  /**
   * Obtiene el primer menú padre, que es quien contiene el título del módulo en el que estoy.
   *
   * @returns - Observable del primer menú.
   */
  getFirstParentMenu(): Observable<Menu> {
    return this.getObservableAllMenus().pipe(
      map((menus) => (menus ? menus[0] : null))
    );
  }
}
