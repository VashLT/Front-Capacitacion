import { TranslateService } from "@ngx-translate/core";
export const defaultLanguage = "es";
/**
 * Método para obtener el idioma actual del navegador.
 *
 * @returns - Devuelve el idioma actual del navegador.
 */
export const getLangBrowser = () =>
  (navigator.language || navigator["userLanguage"])?.split("-")[0] ??
  defaultLanguage;
/**
 * Método para obtener el lenguaje actual del servicio de i18n.
 *
 * @param translateService - TranslateService
 * @returns - String con el lenguaje actual.
 */
export const getCurrentLangI18n = (translateService: TranslateService) => {
  return translateService?.currentLang ?? getLangBrowser();
};
