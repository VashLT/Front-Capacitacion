import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '@UIS-common/layout/shared/interceptors/auth-interceptor.service';
import { I18nInterceptorService } from '@UIS-common/layout/shared/interceptors/i18n-interceptor.service';
import { LoadingInterceptorService } from '@UIS-common/layout/shared/interceptors/loading-interceptor.service';

/**
 * Interceptores principales basados en http.
 */
export const HTTP_INTERCEPTORS_APP_MODULE = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: I18nInterceptorService,
    multi: true,
  },
];
