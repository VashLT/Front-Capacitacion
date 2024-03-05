import { InjectionToken } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";

/**
 * Token de inyección para los interceptores de HTTP en un módulo feature.
 */
export const FEATURE_HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(
  "An abstraction on feature HttpInterceptor[]"
);
