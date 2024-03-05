import {
  HttpBackend,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { InterceptorHandler } from "./interceptor-handler";

/**
 * Handler que permite interceptar las solicitudes HTTP.
 */
export class InterceptingHandler {
  /**
   * Handler.
   */
  private chain: HttpHandler;

  /**
   * Constructor.
   *
   * @param backend - HttpBackend
   * @param interceptors - HttpInterceptor[]
   */
  constructor(
    private backend: HttpBackend,
    private interceptors: HttpInterceptor[]
  ) {
    this.buildChain();
  }

  /**
   * Handle request.
   *
   * @param req - HttpRequest<any>
   * @returns - Observable<HttpEvent<any>>
   */
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.chain.handle(req);
  }

  /**
   * Construye la cadena de interceptores.
   */
  private buildChain(): void {
    this.chain = this.interceptors.reduceRight(
      (next, interceptor) => new InterceptorHandler(next, interceptor),
      this.backend
    );
  }
}
