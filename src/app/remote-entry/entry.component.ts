import { AuthService } from '@UIS-common/layout/core';
import { RouteChangesService } from '@UIS-common/layout/core/network-status/route-changes/route-changes.service';
import { SeoService } from '@UIS-common/layout/core/seo/seo.service';
import { ResetPasswordService } from '@UIS-common/layout/header/components/change-password/services/reset-password.service';
import { EditProfileService } from '@UIS-common/layout/header/components/edit-profile/services/edit-profile.service';
import { AuthInterceptorService } from '@UIS-common/layout/shared/interceptors/auth-interceptor.service';
import { MenuEffect } from '@UIS-common/layout/store/menu/menu-data.effects';
import { ParametrosEffect } from '@UIS-common/layout/store/parametros/parametros.effects';
import { PersonDataEffect } from '@UIS-common/layout/store/person/person-data.effects';
import { RolDataEffect } from '@UIS-common/layout/store/roles/roles-data.effects';
import { UserDataEffect } from '@UIS-common/layout/store/user/user-data.effects';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { projectEnvironments } from 'src/project-config/project-envs';

@Component({
  selector: 'app-entry-component-mfe',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./entry.component.scss'],
  //Nota, lo anterior hace que los servicios se sobreescriban siempre que entremos a x microservicio, lo cual es malo pero se debe dejar mientras se hace la migracion a shadow dom lo cual requiere quitar los ng deep.
})
export class RemoteEntryComponent implements OnInit, OnDestroy {
  /**
   * Constructor del componente.
   *
   * @param seo - Servicio de seo.
   */
  constructor(
    private seo: SeoService,
    private routeChange: RouteChangesService,
    private authService: AuthService,
    private authInterceptorService: AuthInterceptorService,
    private resetPasswordService: ResetPasswordService,
    private editProfileService: EditProfileService,
    private userDataEffect: UserDataEffect,
    private rolDataEffect: RolDataEffect,
    private personDataEffect: PersonDataEffect,
    private parametrosEffect: ParametrosEffect,
    private menuEffect: MenuEffect
  ) {}
  /**
   * Al destruir el componente remoto cancelo subscripciones.
   */
  ngOnDestroy(): void {
    this.seo.unSubscribe();
    this.routeChange.unSubscribe();
    this.authService.unSubscribe();
    this.authInterceptorService.unSubscribe();
    this.resetPasswordService.unSubscribe();
    this.editProfileService.unSubscribe();
    this.userDataEffect.unSubscribe();
    this.rolDataEffect.unSubscribe();
    this.personDataEffect.unSubscribe();
    this.parametrosEffect.unSubscribe();
    this.menuEffect.unSubscribe();
  }

  /**
   * Al inicializar el componente informa para cargar el modulo i18n.
   */
  ngOnInit(): void {
    window.postMessage({
      currentI18nProject: projectEnvironments.slug,
    });
  }
}
