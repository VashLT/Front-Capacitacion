import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";

/**
 * Servicio para historial de navegación.
 */
@Injectable()
export class NavigationService {
  /**
   * Historial de navegación.
   */
  private history: string[] = [];

  /**
   * Constructor del servicio.
   *
   * @param router - Enrutador
   * @param location - Location
   */
  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  /**
   * Método para regresar.
   */
  back(): void {
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
    this.history.pop();
  }
}
