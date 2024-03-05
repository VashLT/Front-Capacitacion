import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateService } from "@ngx-translate/core";
import { catchError, of, switchMap } from "rxjs";
import { defaultLanguage } from "../config/current-lang";
import { environment } from "src/environments/environment";
import { projectEnvironments } from "src/project-config/project-envs";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { mockI18nResponse } from "../mocks/i18n.mock";

/**
 * Implementación del servicio de carga de traducciones.
 */
@Injectable()
export class TranslateLoaderImplService implements TranslateLoader {
  /**
   * Función para validar que un valor sea un json válido.
   *
   * @param value - Valor a validar.
   * @returns - boolean
   */
  private isValidJSON = (value) => {
    try {
      JSON.parse(JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * Almacena las traducciones originales.
   * @type {any}
   */
  public originalTranslations: any = null;

  /**
   * Variable para saber si las traducciones están activas o no.
   */
  i18nEnabled = true;

  /**
   * Función pública para desactivar o activar las traducciones en tiempo de ejecución
   * @returns - void
   * @example
   * console -> toggleStatusI18n();
   */
  public toggleStatusI18n = () => {
    const translate = this.injector.get(TranslateService);
    translate.setTranslation(
      translate.currentLang,
      this.i18nEnabled ? {} : this.originalTranslations
    );
    this.i18nEnabled = !this.i18nEnabled;
  };

  /**
   * Constructor del servicio.
   *
   * @param http - HttpClient
   * @param snackbar - SnackbarService
   * @param injector: Injector
   */
  constructor(
    private http: HttpClient,
    private snackbar: SnackbarService,
    private injector: Injector
  ) {}

  /**
   * Función para obtener el slug;
   *
   * @returns - Slug del modulo.
   */
  private getSlug() {
    return projectEnvironments.slug;
  }

  /**
   * Obtener la traducción.
   *
   * @param lang - Lenguaje a cargar.
   * @returns - Observable de traducciones.
   */
  getTranslation(lang: string) {
    // return this.http
    //   .get(
    //     `${environment.urlBackMetaDatos}/I18NMensajes/allGeneralAndBy?module=${
    //       this.getSlug() ?? ""
    //     }`,
    //     {
    //       headers: {
    //         "next-accept-language": lang,
    //       },
    //     }
    //   )
    return of(mockI18nResponse).pipe(
      switchMap((el: any) => {
        const i18nJSON = el?.module;
        const isValidJSON = this.isValidJSON(i18nJSON);
        if (environment.name !== "production" && isValidJSON) {
          this.originalTranslations = i18nJSON;
          this.exposeToggleI18n();
        }
        return isValidJSON ? of(i18nJSON) : this.getDefaultTranslations();
      }),
      catchError((err) => {
        console.error(err);
        this.getDefaultTranslations(defaultLanguage);
        if (lang === defaultLanguage) {
          this.snackbar.show({
            tipo: "error",
            mensaje: "No se pudo cargar el archivo de traducciones.",
          });
        }
        return of(null);
      })
    );
  }

  /**
   * Función para exponer el método toggleI18n en el ámbito global.
   */
  private exposeToggleI18n() {
    (window as any).toggleI18n = this.toggleStatusI18n.bind(this);
  }

  /**
   * Función para obtener las traducciones por defecto.
   */
  getDefaultTranslations(lang: string = defaultLanguage) {
    const translate = this.injector.get(TranslateService);
    translate.setDefaultLang(lang);
    return translate.use(lang);
  }
}
