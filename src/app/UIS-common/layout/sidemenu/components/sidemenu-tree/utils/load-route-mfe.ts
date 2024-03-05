import { Router } from "@angular/router";

/**
 * Función para moversea cierto microfrontend: hojadevida, admonpagos, etc.
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
    _router.navigate([route]);
    return;
  }
  const parts = rutaCruzada.split("/");
  const modulo = parts[parts.length - 1];
  const rutaRelativa = `/${modulo}${route}`;
  _router.navigate([rutaRelativa]);
};
