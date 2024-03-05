import { Overlay } from "@angular/cdk/overlay";
import { Injectable } from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from "@angular/router";
import { LoaderService } from "@uis/uis-lib/services/loader";
import {
  BehaviorSubject,
  distinctUntilChanged,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from "rxjs";
import { UnsubscriptorService } from "../../unsubscriptor-service/base-unsubscriptor";

/**
 * Servicio que detecta cambios de rutas para mostrar un loader.
 */
@Injectable()
export class RouteChangesService extends UnsubscriptorService {
  /**
   * Indica si esta cargando.
   */
  private loading$ = new BehaviorSubject(false);

  /**
   * Subscripción actual al loader.
   */
  currentSubscription: Subscription;

  /**
   * Constructor del servicio.
   *
   * @param router - Enrutador de Angular
   * @param overlay - Overlay
   */
  constructor(private router: Router, private overlay: Overlay) {
    super();
  }

  /**
   * Función para dessubscribirse de los listeners del seo service.
   */
  unSubscribe() {
    this.unSubscriptor$.next(true);
    this.unSubscriptor$.unsubscribe();
    this.unSubscriptor$ = new Subject<boolean>();
    this.currentSubscription?.unsubscribe();
    this.loading$ = new BehaviorSubject(false);
  }

  /**
   * Función que inicializa la escucha de cambios en el router para asi mostrar el loader.
   */
  init() {
    this.router.events
      .pipe(
        takeUntil(this.unSubscriptor$),
        tap((e: any) => {
          this.navigationInterceptor(e);
        })
      )
      .subscribe();
    this.loading$
      .asObservable()
      .pipe(takeUntil(this.unSubscriptor$), distinctUntilChanged())
      .subscribe((res) => {
        if (res) {
          this.showOverlay();
        } else {
          this.currentSubscription?.unsubscribe();
        }
      });
  }

  /**
   * Función que intercepta el estado de la navegación y emite el estado.
   *
   * @param event - Evento de cambio de router.
   */
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading$.next(true);
    }
    if (event instanceof NavigationEnd) {
      this.loading$.next(false);
    }
    if (event instanceof NavigationCancel) {
      this.loading$.next(false);
    }
    if (event instanceof NavigationError) {
      this.loading$.next(false);
    }
  }

  /**
   * Función que muestra el loader como overlay.
   */
  showOverlay() {
    const instancia = new LoaderService(this.overlay);
    this.currentSubscription = instancia.spinner$.subscribe();
  }
}
