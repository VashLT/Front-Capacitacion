import { Router } from "@angular/router";
import { globalEnvs } from "src/environments/global-envs/global-envs-mf";
import { urlMF } from "src/project-config/project-envs";

/**
 * Función para redirigir al módulo de AUTORIZACIÓN
 * @param reload si la sesión del usuario fue cerrada debido a inactividad
 */
export const redirectToAuth = (router: Router, reload?: boolean) => {
  router.navigateByUrl(globalEnvs.urlFrontAuth);
  if (reload) {
    localStorage.clear();
    localStorage.setItem("reload", "true");
  }
};

/**
 * Función que indica de donde cargar assets en arquitectura de microfrontends.
 *
 * @returns - Url de donde se cargarán los assets.
 */
export const urlAssets = () => urlMF;
