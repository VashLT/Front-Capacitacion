import { lastValueFrom, take } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { APP_INITIALIZER, Injector } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
  MissingTranslationHandler,
} from "@ngx-translate/core";
import { UISMatPaginatorIntl } from "../material-intl/mat-paginator";
import { TranslateLoaderImplService } from "../services/translate-loader-impl.service";
import { getLangBrowser } from "./current-lang";
import { MenuStoreLoaderService } from "../../bootstrap/menu-store-loader.service";
import { TRANSLATE_SERVICE_ADAPTER } from "@uis/uis-lib/pipes/newTranslate";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { DefaultTranslationHandler } from "./default-translation-handler";

/**
 * Importaciones más comunes al momento de usar i18n, la importación root
 * se usa en el app.module mientras que la importación lazy en los lazy modules.
 */
export const I18N_UIS = {
  root: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLoaderImplService,
        //useFactory : HttpLoaderFactory,
        deps: [HttpClient, SnackbarService, Injector, UISMatPaginatorIntl],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: DefaultTranslationHandler,
      },
      defaultLanguage: getLangBrowser(),
    }),
  ],
  lazy: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLoaderImplService,
        //useFactory : HttpLoaderFactory,
        deps: [
          HttpClient,
          SnackbarService,
          Injector,
          UISMatPaginatorIntl,
          MenuStoreLoaderService,
        ],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: DefaultTranslationHandler,
      },
      defaultLanguage: getLangBrowser(),
    }),
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: UISMatPaginatorIntl,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService) => {
        return () => {
          translate.setDefaultLang(getLangBrowser());
          return lastValueFrom(translate.use(getLangBrowser()).pipe(take(1)));
        };
      },
      deps: [TranslateService],
      multi: true,
    },
    {
      provide: TRANSLATE_SERVICE_ADAPTER,
      useExisting: TranslateService,
    },
  ],
};
