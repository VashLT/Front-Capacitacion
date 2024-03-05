import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthService } from "../core";
import { ImageService } from "../header/components/edit-image/services/image.service";
import { LayoutState } from "../store/layout-store.model";
import { UnsubscriptorService } from "../core/unsubscriptor-service/base-unsubscriptor";
import { takeUntil } from "rxjs";

@Component({
  selector: "app-user",
  template: `
    <button
      class="uis-layout-toolbar-button uis-layout-avatar-button"
      mat-button
      [matMenuTriggerFor]="menu"
    >
      <img
        class="uis-layout-avatar"
        [src]="image.b64UserImage$.getValue()"
        width="32"
        alt="avatar"
      />
      <span class="uis-layout-username lt-sm-hide">{{ userName }}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ "Perfil de Usuario" }}</span>
      </button>
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>{{ "Configuraciones" }}</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ "Cerrar Sesión" }}</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent extends UnsubscriptorService implements OnDestroy {
  userName: string;

  constructor(
    private auth: AuthService,
    private store: Store<LayoutState>,
    public image: ImageService
  ) {
    super();
    this.store
      .select("user")
      .pipe(takeUntil(this.unSubscriptor$))
      .subscribe((userData) => {
        if (!userData) {
          return;
        }
        this.userName = userData.NOMBRE_USUARIO;
      });
  }
  ngOnDestroy(): void {
    this.unSubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
