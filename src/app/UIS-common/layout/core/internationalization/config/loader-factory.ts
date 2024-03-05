import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { projectEnvironments } from "src/project-config/project-envs";

/**
 * Método para crear instanciar del cargador de traducciones.
 *
 * @param http - HttpClient
 * @returns - TranslateHttpLoader
 * @deprecated
 */
export const HttpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(
    http,
    `assets/${projectEnvironments.slug}/i18n/`,
    ".json"
  );
};
