import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Handler que permite interceptar las solicitudes HTTP.
 */
export class InterceptorHandler implements HttpHandler {
  /**
   * Constructor.
   *
   * @param next - HttpHandler
   * @param interceptor - HttpInterceptor
   */
  constructor(
    private next: HttpHandler,
    private interceptor: HttpInterceptor
  ) {}

  /**
   * Handle request.
   *
   * @param req - HttpRequest<any>
   * @returns - Observable<HttpEvent<any>>
   */
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}
