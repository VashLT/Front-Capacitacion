import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { CommonModule, Location } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { NgProgressRouterModule } from "ngx-progressbar/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormlyModule } from "@ngx-formly/core";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { PageHeaderComponent } from "./components/page-header/page-header.component";

import { DisableControlDirective } from "./directives/disable-control.directive";

import { SafeUrlPipe } from "./pipes/safe-url.pipe";
import { ToObservablePipe } from "./pipes/to-observable.pipe";
import { MenuHorizontalModule } from "../menu-horizontal/menu.module";
import { MatIconModule } from "@angular/material/icon";
import { NotFoundErrorComponent } from "./components/not-found-error/not-found-error.component";
import { NavigationService } from "./services/navigation/navigation.service";
import { BackButtonModule } from "./directives/back-button/back-button.module";
import { I18N_UIS } from "../core/internationalization/config/i18n-uis";
import { FileToBase64Pipe } from "./pipes/file-to-base-64.pipe";
import { SentenceCase } from "./pipes/sentence-case";
const MODULES = [
  NgProgressModule,
  NgProgressRouterModule,
  NgProgressHttpModule,
  NgSelectModule,
  FormlyModule,
  MenuHorizontalModule,
  MatButtonModule,
  MatCardModule,
  BackButtonModule,
];
const COMPONENTS = [
  BreadcrumbComponent,
  PageHeaderComponent,
  NotFoundErrorComponent,
  FileToBase64Pipe,
];
const COMPONENTS_DYNAMIC = [];
const DIRECTIVES = [DisableControlDirective];
const PIPES = [SafeUrlPipe, ToObservablePipe, SentenceCase];

@NgModule({
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...MODULES,
    MatIconModule,
    ...I18N_UIS.lazy,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (location: Location, router: Router) => () =>
        new NavigationService(router, location),
      deps: [Location, Router],
      multi: true,
    },
  ],
})
export class SharedModule {}
