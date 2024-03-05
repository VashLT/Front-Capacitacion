import { getLangBrowser } from '@UIS-common/layout/core/internationalization/config/current-lang';
import { TranslateLoaderImplService } from '@UIS-common/layout/core/internationalization/services/translate-loader-impl.service';
import { RouteChangesService } from '@UIS-common/layout/core/network-status/route-changes/route-changes.service';
import { SeoService } from '@UIS-common/layout/core/seo/seo.service';
import { Overlay } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from '@uis/uis-lib/services/loader';
import { fromEvent, filter, map, distinctUntilChanged, skip } from 'rxjs';
import { projectEnvironments } from 'src/project-config/project-envs';

/**
 * Función initializer del entry module.
 *
 * @param injector - Injector de angular.
 */
export const initializeEntryModule = (injector: Injector) => {
  const translate = injector.get(TranslateService);
  const loader = injector.get(TranslateLoaderImplService);
  const overlay = injector.get(Overlay);
  const instancia = new LoaderService(overlay);
  const seo = injector.get(SeoService);
  const routeChanges = injector.get(RouteChangesService);
  seo.init();
  routeChanges.init();
  initializeI18n(translate, loader, instancia);
};

/**
 * Función que inicializa la carga de i18n.
 *
 * @param translate - Servicio de traducción.
 * @param translateImpl - Implementación del loader de traducción.
 * @param loader: Servicio de loader.
 */
const initializeI18n = (
  translate: TranslateService,
  translateImpl: TranslateLoaderImplService,
  loader: LoaderService
) => {
  loader.backgroundColor = 'white';
  loader.showNoGet();
  const lang = getLangBrowser();
  translateImpl.getTranslation(lang).subscribe((fileTranslations: any) => {
    if (fileTranslations) {
      translate.setTranslation(lang, fileTranslations);
      translate.use(lang).subscribe(() => {
        loader.hide();
      });
    } else {
      loader.hide();
    }
  });
};

/**
 * Función que indica cuando se deben recargar las traducciones del proyecto.
 *
 * @returns - Observable que indica que se deben recargar las traducciones para este módulo.
 */
export const getSubscriptorToEventToLoadI18nAndMenusOnEntry = () => {
  return fromEvent(window, 'message').pipe(
    filter((ev: any) => ev?.data?.hasOwnProperty('currentI18nProject')),
    map((el) => el.data),
    distinctUntilChanged(
      (prev, current) => prev.currentI18nProject === current.currentI18nProject
    ),
    skip(1),
    filter(
      (data) =>
        data.currentI18nProject &&
        data.currentI18nProject === projectEnvironments.slug
    )
  );
};
