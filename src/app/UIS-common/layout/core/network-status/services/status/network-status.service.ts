import { Injectable } from "@angular/core";
import { BehaviorSubject, fromEvent } from "rxjs";

/**
 * Servicio para detectar el estado de la red.
 */
@Injectable()
export class NetworkStatusService {
  /**
   * Variable para almacenar el estado de la red.
   */
  private currentStatus$ = new BehaviorSubject<boolean>(null);

  /**
   * Constructor del servicio.
   *
   * Me subscribo a los eventos de online y offline del navegador.
   * Cuando ocurre el evento online, emito un true y luego de 5 segundos un null, para que se oculte el msg.
   */
  constructor() {
    fromEvent(window, "online")
      .pipe()
      .subscribe(() => {
        this.currentStatus$.next(true);
        setTimeout(() => {
          this.currentStatus$.next(null);
        }, 5000);
      });
    fromEvent(window, "offline")
      .pipe()
      .subscribe(() => {
        this.currentStatus$.next(false);
      });
  }

  /**
   * Function to check if the user is online or offline
   *
   * @returns - Observable<boolean> - true if online, false if offline
   */
  online() {
    return this.currentStatus$.asObservable();
  }
}
