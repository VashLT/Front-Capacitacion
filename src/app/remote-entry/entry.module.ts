import { Injector, NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { RemoteEntryComponent } from './entry.component';
import { StoreModule } from '@ngrx/store';
import { datosPersonalesAspiranteReducer } from '../recursos-humanos/hoja-vida/aspirante/store-datos-personales/datos-personales.reducer';
import { searchReducer } from '../recursos-humanos/hoja-vida/buscador-personas/store/search.reducer';
import { datosPersonalesReducer } from '../recursos-humanos/hoja-vida/gestionar-hv/store-datos-personales/datos-personales.reducer';
import { AppEntryRoutingModule } from './entry-routing.module';
import { PPAL_PROVIDERS } from '../providers-ppal';
import { PPAL_MODULES_WITHOUT_LOADER_I18N_ROOT } from '../modules-ppal';
import { ImagenUsuarioService } from '../recursos-humanos/hoja-vida/gestionar-hv/imagen-usuario/imagen-usuario.service';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateLoaderImplService } from '@UIS-common/layout/core/internationalization/services/translate-loader-impl.service';
import { I18N_UIS } from '@UIS-common/layout/core/internationalization/config/i18n-uis';
import {
  initializeEntryModule,
  getSubscriptorToEventToLoadI18nAndMenusOnEntry,
} from './initializers.entry';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  TRANSLATE_SERVICE_ADAPTER,
  NewTranslatePipe,
} from '@uis/uis-lib/pipes/newTranslate';
import { TranslateService } from '@ngx-translate/core';
import { I18nModule } from '@uis/uis-lib/pipes';
import { MODULE_PROVIDERS } from '../module-providers';
import { MenuStoreLoaderService } from '@UIS-common/layout/core/bootstrap/menu-store-loader.service';
import { ProvideDefaultsRoutesService } from '@UIS-common/layout/core/authentication/routes/provide-defaults-routes.service';
import { CustomRoutesGuardService } from '@services/general/routes/custom-routes-guard.service';
import { projectEnvironments } from 'src/project-config/project-envs';
import { AuthInterceptorService } from '@UIS-common/layout/shared/interceptors/auth-interceptor.service';
import { CrudService } from '@uis/uis-lib/services/crud';
/**
 * Módulo remoto por el cual se accede a hoja de vida en arquitectura de microfrontends.
 * Al cargarse como un módulo lazy remoto algunos servicios no se comportan como se espera, especialmente por el típico provideIn: 'root'.
 * Por ello se deben proveer todos ellos aquí.
 *
 * Adicionalmente en el constructor de este módulo se inicializa la carga de i18n,
 * para que cada vez que cambie de proyecto se carguen las traducciones correspondientes.
 *
 * Con la arquitectura de microfrontends solo habrá un único SPA.
 */
@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    AppEntryRoutingModule,
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
    MatMomentDateModule,
    MatDatepickerModule,
    StoreModule.forFeature('', {
      lastSearch: searchReducer,
      datosPersonales: datosPersonalesReducer,
      datosPersonalesAspirante: datosPersonalesAspiranteReducer,
    }),
    OverlayModule,
    I18nModule.forChild([
      {
        provide: TRANSLATE_SERVICE_ADAPTER,
        useExisting: TranslateService,
      },
    ]),
    // EffectsModule.forRoot([]), En caso de que en sus proyectos haya un effects module for root en su app module se debe cambiar por .forFeature
    ...PPAL_MODULES_WITHOUT_LOADER_I18N_ROOT,
    ...I18N_UIS.lazy,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: projectEnvironments.slug },
    ...PPAL_PROVIDERS,
    ...MODULE_PROVIDERS,
    ImagenUsuarioService,
    TranslateLoaderImplService,
    AuthInterceptorService,
    {
      provide: ProvideDefaultsRoutesService,
      useClass: CustomRoutesGuardService,
    },
    NewTranslatePipe,
    CrudService,
  ],
})
export class RemoteEntryModule {
  constructor(private injector: Injector) {
    initializeEntryModule(this.injector);
    getSubscriptorToEventToLoadI18nAndMenusOnEntry().subscribe(() => {
      initializeEntryModule(this.injector);
      const menusLoader = this.injector.get(MenuStoreLoaderService);
      menusLoader.loadStore();
    });
  }
}
