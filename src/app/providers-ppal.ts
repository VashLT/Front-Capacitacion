import {
  DatePipe,
  LocationStrategy,
  HashLocationStrategy,
} from '@angular/common';
import { AuthGuard, StartupService } from '@UIS-common/layout/core';
import { APP_INITIALIZER_PROVIDERS } from '@UIS-common/layout/core/initializers';
import { I18N_UIS } from '@UIS-common/layout/core/internationalization/config/i18n-uis';
import { LAYOUT_SEO_PROVIDERS } from '@UIS-common/layout/core/seo/providers';
import { IMaskPipe } from 'angular-imask';
import { HTTP_INTERCEPTORS_APP_MODULE } from './http-interceptors-ppal';
import { MATERIAL_PROVIDERS } from './material/providers';
import { LAYOUT_PROVIDERS_ROOT } from '@UIS-common/layout/core/providers/providers-to-import.root';
import { RouteChangesService } from '@UIS-common/layout/core/network-status/route-changes/route-changes.service';
import { ORIGIN_URL_DIRECTIVE } from '@uis/uis-lib/directives';
import { urlAssets } from 'src/environments/utils/utils-not-mf';

/**
 * Providers principales de la aplicación.
 */
export const PPAL_PROVIDERS = [
  IMaskPipe,
  ...APP_INITIALIZER_PROVIDERS,
  ...HTTP_INTERCEPTORS_APP_MODULE,
  DatePipe,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  AuthGuard,
  ...I18N_UIS.providers,
  ...LAYOUT_SEO_PROVIDERS,
  ...MATERIAL_PROVIDERS,
  ...LAYOUT_PROVIDERS_ROOT,
  StartupService,
  RouteChangesService,
  {
    provide: ORIGIN_URL_DIRECTIVE,
    useValue: urlAssets(),
  },
];
