import { Inject, Injectable } from "@angular/core";
import {
  HttpBackend,
  HttpClient,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";

import { InterceptingHandler } from "./models/intercepting-handler";
import { FEATURE_HTTP_INTERCEPTORS } from "./tokens/feature-http-interceptors";

/**
 * HttpClient a usarse cuando se quieran usar interceptores en un módulo feature.
 */
@Injectable()
export class FeatureHttpClient extends HttpClient {
  /**
   * Constructor.
   *
   * @param backend - HttpBackend
   * @param interceptors - HttpInterceptor[]
   * @param featureInterceptors - HttpInterceptor[]
   */
  constructor(
    backend: HttpBackend,
    @Inject(HTTP_INTERCEPTORS) interceptors: HttpInterceptor[],
    @Inject(FEATURE_HTTP_INTERCEPTORS) featureInterceptors: HttpInterceptor[]
  ) {
    super(
      new InterceptingHandler(backend, interceptors.concat(featureInterceptors))
    );
  }
}
