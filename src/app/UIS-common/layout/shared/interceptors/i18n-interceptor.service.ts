import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { getCurrentLangI18n } from "../../core/internationalization/config/current-lang";
import { Observable } from "rxjs";

/**
 * Interceptor para manejar lo relacionado a i18n con backend.
 */
@Injectable()
export class I18nInterceptorService implements HttpInterceptor {
  /**
   * Constructor del interceptor.
   *
   * @param translate - TranslateService
   */
  constructor(private readonly injector: Injector) {}

  /**
   * Método para cambiar los encabezados referentes al idioma de la aplicación.
   *
   * @param request - HttpRequest
   * @returns - HttpRequest
   */
  private addI18nHeaders(request: HttpRequest<any>): HttpRequest<any> {
    let translateService: TranslateService;
    try {
      translateService = this.injector.get(TranslateService);
    } catch {
      translateService = null;
    }

    return request.clone({
      headers: request.headers.set(
        "Accept-Language",
        request.headers.get("next-accept-language")
          ? request.headers.get("next-accept-language")
          : getCurrentLangI18n(translateService)
      ),
    });
  }

  /**
   * Método principal para interceptar las peticiones.
   *
   * @param req - HttpRequest
   * @param next - HttpHandler
   * @returns - Observable<HttpEvent<any>>
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = this.addI18nHeaders(req);
    return next.handle(req);
  }
}
