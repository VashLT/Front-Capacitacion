import { Subject } from "rxjs";

/**
 * Clase base para implementar unsubscriptor en servicios.
 */
export class UnsubscriptorService {
  /**
   * Unsubscriptor del seo service.
   */
  unSubscriptor$ = new Subject<boolean>();

  /**
   * Función para dessubscribirse de los listeners del seo service.
   */
  unSubscribe() {
    this.unSubscriptor$.next(true);
    this.unSubscriptor$.unsubscribe();
    this.unSubscriptor$ = new Subject<boolean>();
  }
}
