import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
} from "@ngx-translate/core";

/**
 * Servicio que maneja las traducciones faltantes y proporciona traducciones predeterminadas.
 */
export class DefaultTranslationHandler implements MissingTranslationHandler {
  /**
   * Maneja las traducciones faltantes y devuelve una traducción predeterminada si está disponible.
   * Si no hay una traducción predeterminada, devuelve la última parte de la clave.
   *
   * @param params - Parámetros de manejo de traducciones faltantes.
   * @returns La traducción predeterminada o la última parte de la clave si no está disponible.
   */
  handle(params: MissingTranslationHandlerParams) {
    return params.interpolateParams?.["default"] || params.key.split(".").pop();
  }
}
