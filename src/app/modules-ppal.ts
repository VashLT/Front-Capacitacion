import { IMaskModule } from 'angular-imask';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateService } from '@ngx-translate/core';
import { I18N_UIS } from '@UIS-common/layout/core/internationalization/config/i18n-uis';
import { UisLayoutModule } from '@UIS-common/layout/uis-layout.module';
import { I18nModule } from '@uis/uis-lib/pipes';
import { StoreDevModules } from './store/config/devtool';
import { TRANSLATE_SERVICE_ADAPTER } from '@uis/uis-lib/pipes/newTranslate';
import { DirectivesModule } from '@uis/uis-lib/directives';

/**
 * Modulos a cargar en el app module, sin lo asociado a i18n.
 */
export const PPAL_MODULES_WITHOUT_LOADER_I18N_ROOT = [
  HttpClientModule,
  UisLayoutModule,
  IMaskModule,
  LayoutModule,
  DirectivesModule,
  MatDatepickerModule,
  ...StoreDevModules,
];

/**
 * Módulos a cargar en el app module, con lo asociado a i18n.
 */
export const PPAL_MODULES_WITH_LOADER_I18N_ROOT = [
  ...PPAL_MODULES_WITHOUT_LOADER_I18N_ROOT,
  ...I18N_UIS.root,
  I18nModule.forRoot([
    {
      provide: TRANSLATE_SERVICE_ADAPTER,
      useExisting: TranslateService,
    },
  ]),
];
