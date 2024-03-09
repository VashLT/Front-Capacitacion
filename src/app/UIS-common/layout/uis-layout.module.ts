import { ParametrosEffect } from "./store/parametros/parametros.effects";
import { parametrosReducer } from "./store/parametros/parametros.reducer";
import { EmptyComponentComponent } from "./core/authentication/empty-component/empty-component.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgModule } from "@angular/core";

import { SidebarComponent } from "./sidebar/sidebar.component";
import { UserPanelComponent } from "./sidebar/user-panel.component";
import { SidemenuComponent as OldSidemenuComponent } from "./old-sidemenu/sidemenu.component";
import { AccordionDirective } from "./old-sidemenu/accordion.directive";
import { AccordionItemDirective } from "./old-sidemenu/accordionItem.directive";
import { AccordionAnchorDirective } from "./old-sidemenu/accordionanchor.directive";
import { SidebarNoticeComponent } from "./sidebar-notice/sidebar-notice.component";

import { TopmenuComponent } from "./topmenu/topmenu.component";
import { TopmenuPanelComponent } from "./topmenu/topmenu-panel.component";

import { HeaderComponent } from "./header/header.component";

import { BrandingComponent } from "./widgets/branding.component";
import { GithubButtonComponent } from "./widgets/github.component";
import { NotificationComponent } from "./widgets/notification.component";
import { TranslateComponent } from "./widgets/translate.component";
import { UserComponent } from "./widgets/user.component";

import { UisLayoutComponent } from "./app-layout/uis-layout.component";
import { SharedModule } from "./shared";
import { MatCommonModule, MatRippleModule } from "@angular/material/core";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { MatSidenavModule } from "@angular/material/sidenav";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { StoreModule } from "@ngrx/store";
import { menuDataReducer } from "./store/menu/menu-data.reducer";
import { EffectsModule } from "@ngrx/effects";
import { MenuEffect } from "./store/menu/menu-data.effects";
import { UserDataEffect } from "./store/user/user-data.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { EditProfileComponent } from "./header/components/edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "./header/components/change-password/change-password.component";
import { SetDefaultRoleComponent } from "./header/components/set-default-role/set-default-role.component";
import { SaveChangesComponent } from "./header/components/save-changes/save-changes.component";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { SearchPipe } from "./sidebar/pipes/search.pipe";
import { EditImageComponent } from "./header/components/edit-image/edit-image.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { userDataReducer } from "./store/user/user-data.reducer";
import { rolesDataReducer } from "./store/roles/roles-data.reducer";
import { personDataReducer } from "./store/person/person-data.reducer";
import { PersonDataEffect } from "./store/person/person-data.effects";
import { RolDataEffect } from "./store/roles/roles-data.effects";
import { ModifyFileChooserSignDirective } from "./header/components/edit-profile/directives/modify-file-chooser-sign.directive";
import { MenuPanelComponent } from "./header/components/menu-panel/menu-panel.component";
import { SidemenuComponent } from "./sidemenu/sidemenu.component";
import { SidemenuTreeComponent } from "./sidemenu/components/sidemenu-tree/sidemenu-tree.component";
import { MatTreeModule } from "@angular/material/tree";
import { ImageCropperModule } from "ngx-image-cropper";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { I18N_UIS } from "./core/internationalization/config/i18n-uis";
import { ServiceWorkerModule } from "@angular/service-worker";
import { ConfirmContentUpdateComponent } from "./core/service-workers/updating-app/components/confirm-content-update/confirm-content-update.component";
import { CustomMenuPanelComponent } from "./custom-menu-panel/custom-menu-panel.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatChipsModule } from "@angular/material/chips";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AppPanelComponent } from "./custom-menu-panel/components/app-panel/app-panel.component";
import { AdjustImgModule } from "@uis/uis-lib/components/adjust-img";
import { FileChooserModule } from "@uis/uis-lib/components/file-chooser";
import { LoaderModule } from "@uis/uis-lib/components/loader";
import { MatSelectTwoModule } from "@uis/uis-lib/components/mat-select-two";
import { CrudDialogModule } from "@uis/uis-lib/components/crud-dialog";
import { SideModuleBarComponent } from "./side-module-bar/side-module-bar.component";

@NgModule({
  declarations: [
    UisLayoutComponent,
    SidebarComponent,
    UserPanelComponent,
    OldSidemenuComponent,
    AccordionDirective,
    AccordionItemDirective,
    AccordionAnchorDirective,
    SidebarNoticeComponent,
    TopmenuComponent,
    TopmenuPanelComponent,
    HeaderComponent,
    BrandingComponent,
    GithubButtonComponent,
    NotificationComponent,
    TranslateComponent,
    UserComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    SetDefaultRoleComponent,
    SaveChangesComponent,
    SearchPipe,
    AppPanelComponent,
    EditImageComponent,
    ModifyFileChooserSignDirective,
    MenuPanelComponent,
    SidemenuComponent,
    SidemenuTreeComponent,
    EmptyComponentComponent,
    ConfirmContentUpdateComponent,
    CustomMenuPanelComponent,
    SideModuleBarComponent,
    AppPanelComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    CrudDialogModule,
    NgIdleKeepaliveModule.forRoot(),
    SharedModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    LoaderModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    DragDropModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    MatCommonModule,
    MatInputModule,
    MatTooltipModule,
    FileChooserModule,
    MatSelectTwoModule,
    MatTreeModule,
    StoreModule.forFeature("currentNavigation", menuDataReducer),
    StoreModule.forFeature("user", userDataReducer),
    StoreModule.forFeature("roles", rolesDataReducer),
    StoreModule.forFeature("person", personDataReducer),
    StoreModule.forFeature("parametros", parametrosReducer),
    EffectsModule.forFeature([
      MenuEffect,
      UserDataEffect,
      PersonDataEffect,
      RolDataEffect,
      ParametrosEffect,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      connectInZone: true,
    }),
    ImageCropperModule,
    MatProgressSpinnerModule,
    AdjustImgModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.name !== "" || environment.production,
    }),
    ...I18N_UIS.lazy,
  ],
})
export class UisLayoutModule { }
