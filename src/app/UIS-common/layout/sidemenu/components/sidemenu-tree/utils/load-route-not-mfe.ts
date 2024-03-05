import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

/**
 * Función para moversea cierta página rsi: hojadevida, admonpagos, etc.
 *
 * @param route - Ruta a cargar.
 * @param _router - Enrutador de la aplicación.
 */
export const loadRoute = (
  route: string,
  _router: Router,
  rutaCruzada: string
) => {
  if (!rutaCruzada) {
    location.href = (environment.name ? `/${environment.name}` : "") + route;
    return;
  }
  location.href = rutaCruzada + "#" + route;
};
