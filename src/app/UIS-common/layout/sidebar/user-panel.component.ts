/* eslint-disable @angular-eslint/no-output-rename */
import { Component, OnDestroy } from "@angular/core";
import { AuthService, MenuService } from "../core";
import { ImageService } from "../header/components/edit-image/services/image.service";
import { Store } from "@ngrx/store";
import { LayoutState } from "../store/layout-store.model";
import { Confirm } from "@uis/uis-lib/services/confirm";
import { UnsubscriptorService } from "../core/unsubscriptor-service/base-unsubscriptor";
import { takeUntil } from "rxjs";
import { redirectToAuth, urlAssets } from "src/environments/utils/utils-not-mf";
import { Router } from "@angular/router";
import { Menu } from "../core/bootstrap/models/menu.model";
import { LosetasService } from "../side-module-bar/service/losetas.service";
import { MenuDataService } from "../store/menu/menu-data.service";
import { projectEnvironments } from "src/project-config/project-envs";
import { loadMenus } from "../store/menu/menu-data.actions";

@Component({
  selector: "app-user-panel",
  template: `
    <div
      class="uis-layout-user-panel default-column justify-center align-center"
    >
      <img
        class="uis-layout-user-panel-avatar"
        [src]="imageService.b64UserImage$.getValue()"
        alt="avatar"
        width="65"
      />
      <div class="datos-user">
        <h4 class="uis-layout-user-panel-name">{{ userName }}</h4>
        <h5 class="uis-layout-user-panel-email">{{ email }}</h5>
        <button class="btn select truncate" [matMenuTriggerFor]="menu">
          <span class="text">{{
            selectedRole ? selectedRole.NOMBRE : ""
          }}</span>
          <mat-icon>keyboard_arrow_down</mat-icon>
        </button>
        <mat-menu
          #menu="matMenu"
          xPosition="after"
          yPosition="below"
          class="common-popup"
        >
          <p class="menu-title">
            {{ "GENERAL_PAGES_FROM_LAYOUT.ROLES" | translate }}
          </p>
          <button
            class="btn menu-option truncate"
            *ngFor="let role of rolesData"
            (click)="selectRole(role)"
            title="{{ role.NOMBRE }}"
          >
            {{ role.NOMBRE }}
          </button>
          <mat-divider></mat-divider>
          <button class="btn menu-option truncate" (click)="selectRole(null)">
            {{ "GENERAL_PAGES_FROM_LAYOUT.DEFAULT_ROL" | translate }}
          </button>
        </mat-menu>
      </div>
      <!-- <button mat-flat-button (click)="goToAuth()">
        <mat-icon class="icon-20">apps</mat-icon
        >{{ "GENERAL_PAGES_FROM_LAYOUT.SIDEMENU.GO_MAIN_MENU" | translate }}
      </button> -->
    </div>
    <mat-divider class="divisor"></mat-divider>
  `,
  styleUrls: ["./user-panel.component.scss"],
})
export class UserPanelComponent
  extends UnsubscriptorService
  implements OnDestroy
{
  userName: string;
  email: string;
  menu$ = this.menu.getAll();
  rolesData = [];
  selectedRole: any;
  actualMenu: Menu;
  runs = 0;
  constructor(
    private confirm: Confirm,
    private store: Store<LayoutState>,
    private auth: AuthService,
    private router: Router,
    public menu: MenuService,
    public imageService: ImageService,
    private losetasService: LosetasService,
    private menuDataService: MenuDataService
  ) {
    super();
    this.store
      .select("roles")
      .pipe(takeUntil(this.unSubscriptor$))
      .subscribe((rolesData) => {
        if (!rolesData) {
          return;
        }
        this.rolesData = rolesData;
        const idRol = parseInt(localStorage.getItem("idRol"));
        this.selectedRole = rolesData.find((rol) => rol.ID === idRol);
      });

    this.store
      .select("user")
      .pipe(takeUntil(this.unSubscriptor$))
      .subscribe((userData) => {
        if (!userData) {
          return;
        }
        this.userName = userData.NOMBRE_USUARIO;
      });

    this.store
      .select("person")
      .pipe(takeUntil(this.unSubscriptor$))
      .subscribe((personData) => {
        if (!personData) {
          return;
        }
        this.email = personData.EMAIL_CORP || personData.EMAIL_PER;
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  async selectRole(role: any) {
    if (!this.selectedRole) return;
    this.runs = 0;
    //si elije rol predeterminado

    if (role === null) {
      const defaultRole = this.rolesData.find((rol) => rol.ROL_POR_DEFECTO);
      role = defaultRole ? defaultRole : role;
    }
    if (role.ID !== this.selectedRole.ID) {
      //search menu con la url actual
      this.selectedRole = role;
      localStorage.setItem("idRol", role.ID);
      var menus = await this.losetasService.getLosetas();
      this.store.select("currentNavigation").subscribe((navigation) => {
        const loseta = menus.find(
          (menu) => menu.NOMBRE === navigation.rolMenus[0].name
        );
        //si el nuevo rol no tiene acceso a la loseta
        if (!loseta) {
          redirectToAuth(this.router);
        } else {
          //recargar currentNavigation
          if (this.runs === 0) {
            this.navigateToHomeModule();
            this.reloadCurrentNavigation();
            this.runs++;
          }
        }
      });
    }
  }

  navigateToHomeModule() {
    var ruta = "/";
    if (urlAssets()) {
      ruta = ruta + this.router.url.split("/")[1];
    }
    this.router.navigate([ruta]);
  }

  reloadCurrentNavigation() {
    this.store.dispatch(loadMenus({ slug: projectEnvironments.slug }));
  }

  logout() {
    this.confirm
      .show({
        title: "Cerrar sesión",
        content: "¿Está seguro de finalizar la sesión?",
        actions: { primary: "Cerrar sesión", secondary: "Cancelar" },
      })
      .then((res) => {
        if (res) {
          this.auth.logout();
        }
      });
  }

  goToAuth() {
    redirectToAuth(this.router);
  }
  getUserRol() {}
}
