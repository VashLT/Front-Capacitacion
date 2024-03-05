import { Router } from "@angular/router";

/**
 * Función para redirigir al módulo de AUTORIZACIÓN
 * @param reload si la sesión del usuario fue cerrada debido a inactividad
 */
export const redirectToAuth = (_router: Router, reload?: boolean) => {
  // window.location.href = globalEnvs.urlFrontAuth;
  if (reload) {
    localStorage.clear();
    localStorage.setItem("reload", "true");
  }
};

/**
 * Función que indica de donde cargar assets en arquitectura de no microfrontends.
 *
 * @returns - Url de donde se cargarán los assets.
 */
export const urlAssets = () => null;
