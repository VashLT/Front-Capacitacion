import { TranslateService } from "@ngx-translate/core";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  ChangeDetectorRef,
  NgZone,
  HostListener,
} from "@angular/core";
import * as screenfull from "screenfull";
import { DEFAULT_INTERRUPTSOURCES, Idle } from "@ng-idle/core";
import { Keepalive } from "@ng-idle/keepalive";
import { EmptyComponentComponent } from "../core/authentication/empty-component/empty-component.component";
import { combineLatest, mergeMap, of } from "rxjs";
import { AuthService, MenuService } from "../core";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { User } from "../core/authentication/interface";
import { SaveChangesComponent } from "./components/save-changes/save-changes.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { EditProfileService } from "./components/edit-profile/services/edit-profile.service";
import { ResetPasswordService } from "./components/change-password/services/reset-password.service";
import { SetDefaultRoleComponent } from "./components/set-default-role/set-default-role.component";
import { RolService } from "./components/set-default-role/services/rol.service";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import { LayoutState } from "../store/layout-store.model";
import { UserData } from "../store/user/user-data.model";
import { ImageService } from "./components/edit-image/services/image.service";
import { editPersonData } from "../store/person/person-data.actions";
import { getRolData } from "../store/roles/roles-data.actions";
import { PersonData } from "../store/person/person-data.model";
import { Confirm } from "@uis/uis-lib/services/confirm";
import { CrudService } from "@uis/uis-lib/services/crud";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { redirectToAuth } from "src/environments/utils/utils-not-mf";
import { Router } from "@angular/router";
import { Menu } from "../custom-menu-panel/models/models";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  selector: "app-header",
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: "uis-layout-header",
  },
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [RolService],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() opened = true;
  @Input() showBranding = false;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();
  @Output() toggleMenuConfig: EventEmitter<any> = new EventEmitter();

  user: User;
  userData: UserData;
  idUser: number;
  personData: PersonData;
  screenWidth: number;
  private get screenfull(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  public menuPanel: Menu[] = [];
  public currentMenus: any;
  public route: string;
  public show: boolean = true;
  public showMenuPanel: boolean = false;
  idleState = "NOT_STARTED";
  countdown?: number = null;
  lastPing?: Date = null;
  smallScreen: boolean;

  // add parameters for Idle and Keepalive (if using) so Angular will inject them from the module
  constructor(
    private idle: Idle,
    keepalive: Keepalive,
    cd: ChangeDetectorRef,
    private confirm: Confirm,
    private crudService: CrudService,
    private zone: NgZone,
    private snackbar: SnackbarService,
    private editProfileService: EditProfileService,
    private resetPasswordService: ResetPasswordService,
    private rolService: RolService,
    private store: Store<LayoutState>,
    private translate: TranslateService,
    private auth: AuthService,
    private router: Router,
    public menuService: MenuService,
    public imageService: ImageService,
    private mediaMatcher: MediaMatcher
  ) {
    this.store.select("user").subscribe((data) => {
      if (!data) {
        return;
      }
      this.idUser = data.ID;
    });

    this.store.select("person").subscribe((data) => {
      if (!data) {
        return;
      }
      this.personData = data;
    });

    this.store.select("currentNavigation").subscribe((data) => {
      if (!data) {
        return;
      }
    });

    // set idle parameters
    idle.setIdle(1); // how long can they be inactive before considered idle, in seconds
    idle.setTimeout(1800); // how long can they be idle before considered timed out, in seconds
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active

    // do something when the user becomes idle
    idle.onIdleStart.subscribe(() => {
      this.idleState = "IDLE";
    });
    // do something when the user is no longer idle
    idle.onIdleEnd.subscribe(() => {
      this.idleState = "NOT_IDLE";
      this.countdown = null;
      cd.detectChanges(); // how do i avoid this kludge?
    });
    // do something when the user has timed out
    idle.onTimeout.subscribe(() => {
      this.idleState = "TIMED_OUT";
      this.zone.run(() => {
        if (environment.production || environment.name === "preprod") {
          redirectToAuth(this.router, true);
        }
      });
    }); // do something as the timeout countdown does its thing

    idle.onTimeoutWarning.subscribe((seconds) => (this.countdown = seconds));

    // set keepalive parameters, omit if not using keepalive
    keepalive.interval(15); // will ping at this interval while not idle, in seconds
    keepalive.onPing.subscribe(() => (this.lastPing = new Date())); // do something when it pings
  }

  /**
   * Función para revisar si ya hay un modal de inactividad abierto.
   *
   * @returns - Boolean indicando si ya hay un modal de inactividad abierto
   */
  modalIsOpened() {
    let opened = false;
    for (const ref of this.crudService.referencias || []) {
      if (
        ref[0].componentInstance?.componentRef?.instance instanceof
        EmptyComponentComponent
      ) {
        opened = true;
      }
    }
    return opened;
  }

  reset() {
    // we'll call this method when we want to start/reset the idle process
    // reset any component state and be sure to call idle.watch()
    this.idle.watch();
    this.idleState = "NOT_IDLE";
    this.countdown = null;
    this.lastPing = null;
  }

  ngOnInit(): void {
    // right when the component initializes, start reset state and start watching
    this.reset();

    this.screenWidth = window.innerWidth;
    this.smallScreen = this.screenWidth < 600;
    this.mediaMatcher
      .matchMedia("(min-width: 600px)")
      .addEventListener("change", () => {
        this.screenWidth = window.innerWidth;
        this.smallScreen = this.screenWidth <= 600;
      });
  }

  toggleFullscreen(): void {
    if (this.screenfull.isEnabled) {
      this.screenfull.toggle();
    }
  }

  toggleMenuPanel($event) {
    $event.stopPropagation();
    this.showMenuPanel = !this.showMenuPanel;

    if (this.showMenuPanel) this.getDirectMenus();
  }

  @HostListener("document:click", ["$event"]) onDocumentClick() {
    this.showMenuPanel = false;
  }

  getDirectMenus() {
    this.rolService.getRightTopMenus().subscribe((data) => {
      this.menuPanel = [...data];

      this.menuPanel.forEach((module) => {
        module.icono = JSON.parse(module.icono).value;
        if (module.hijos) {
          module.hijos = module.hijos.filter((menu) => menu.rightTopMenu);
          module.hijos.forEach((menu) => {
            if (module.ruta !== "/main-menu") {
              menu.ruta = module.ruta
                ? `${module.ruta}/#${menu.ruta}`
                : `/authmf/#/auth`;
            }
            menu.ruta = this.getFullRoute(menu.ruta);
            if (menu?.icono && this.isValidIcon(menu.icono)) {
              menu.icono = JSON.parse(menu.icono).value;
            } else {
              menu.icono = "widgets";
            }

            if (menu.tag) {
              menu.nombre = menu.nombre + " (" + menu.tag + ")";
            }
          });
        }
      });
      this.menuPanel = this.menuPanel.filter(
        (module) => module.hijos?.length > 0
      );
    });
  }

  goHome() {
    redirectToAuth(this.router);
  }

  logout() {
    this.confirm
      .show({
        title: this.translate.stream(
          "GENERAL_PAGES_FROM_LAYOUT.LOGOUT_MODAL.TITLE"
        ),
        content: this.translate.stream(
          "GENERAL_PAGES_FROM_LAYOUT.LOGOUT_MODAL.CONTENT"
        ),
        actions: {
          primary: this.translate.stream("BUTTONS_NAMES.LOGOUT"),
          secondary: this.translate.stream("BUTTONS_NAMES.CANCEL_BUTTON"),
        },
      })
      .then((res) => {
        if (res) {
          this.auth.logout();
        }
      });
  }

  editProfile() {
    this.crudService
      .show({
        title: this.translate.stream(
          "GENERAL_PAGES_FROM_LAYOUT.TOP_NAV_BAR_MESSAGES.EDIT_PROFILE.MODAL.TITLE"
        ),
        component: EditProfileComponent,
        maxWidth: "600px",
        dataComponent: {
          idUser: this.idUser,
        },
        actions: {
          primary: this.translate.stream("BUTTONS_NAMES.SAVE_BUTTON"),
          secondary: this.translate.stream("BUTTONS_NAMES.CANCEL_BUTTON"),
        },
      })
      .subscribe((res) => {
        if (res.estado) {
          const firstSignature =
            res.dialogRef.componentInstance.componentRef.instance
              .firstValueOfSignature;

          const data = res.data;
          this.crudService
            .show({
              title: this.translate.stream(
                "GENERAL_PAGES_FROM_LAYOUT.TOP_NAV_BAR_MESSAGES.EDIT_PROFILE.MODAL.SAVE_CHANGES_TITLE"
              ),
              component: SaveChangesComponent,
              maxWidth: "500px",
              dataComponent: {},
              actions: {
                primary: this.translate.stream("BUTTONS_NAMES.SAVE_BUTTON"),
                secondary: this.translate.stream("BUTTONS_NAMES.CANCEL_BUTTON"),
              },
            })
            .subscribe((response) => {
              if (response.estado) {
                const password = response.data.currentPassword;

                const didEditBasicData =
                  data.firstName !== this.personData.PRIMER_NOMBRE ||
                  data.secondName !== this.personData.SEGUNDO_NOMBRE ||
                  data.firstSurname !== this.personData.PRIMER_APELLIDO ||
                  data.secondSurname !== this.personData.SEGUNDO_APELLIDO ||
                  data.email !== this.personData.EMAIL_PER ||
                  data.emailInstitucional !== this.personData.EMAIL_CORP ||
                  data.firmaB64 !== firstSignature;

                const didEditImage = Boolean(data.userImage);

                if (didEditBasicData && didEditImage) {
                  this.editProfileService
                    .editProfile(
                      data.firstName,
                      data.secondName,
                      data.firstSurname,
                      data.secondSurname,
                      data.email,
                      data.firmaB64,
                      password,
                      data.emailInstitucional
                    )
                    .pipe(
                      mergeMap((editBasicDataRes) => {
                        if (data.userImage) {
                          return combineLatest([
                            of(editBasicDataRes),
                            this.imageService.updateFoto(
                              data.userImage.file,
                              this.personData.ID
                            ),
                          ]);
                        }
                        return of(editBasicDataRes);
                      })
                    )
                    .subscribe({
                      next: (editProfileRes) => {
                        let combineResponse: any = editProfileRes;
                        if (Array.isArray(editProfileRes)) {
                          /**
                           * corresponden a las respuestas de editar datos basicos
                           * y imagen del usuario respectivamente
                           */
                          combineResponse =
                            editProfileRes[0] && editProfileRes[1];
                        }
                        if (combineResponse) {
                          this.crudService.close(res.dialogRef);
                          this.crudService.close(response.dialogRef);
                          this.snackbar.show({
                            mensaje: this.translate.instant(
                              "CRUD_MESSAGES.ON_SAVE_CHANGES_NOT_RECORD"
                            ),
                            tipo: "success",
                          });
                          /**
                           * actualiza los nuevos datos de la persona en el Store
                           */
                          this.store.dispatch(
                            editPersonData({
                              attributes: {
                                PRIMER_NOMBRE: data.firstName,
                                SEGUNDO_NOMBRE: data.secondName,
                                PRIMER_APELLIDO: data.firstSurname,
                                SEGUNDO_APELLIDO: data.secondSurname,
                                EMAIL_PER: data.email,
                                EMAIL_CORP: data.emailInstitucional,
                              },
                            })
                          );

                          if (data.userImage) {
                            this.imageService.b64UserImage$.next(
                              data.userImage.blob
                            );
                          }
                        }
                      },
                      error: (err) => this.snackbar.showBackError(err),
                    });
                } else if (didEditBasicData) {
                  this.editProfileService
                    .editProfile(
                      data.firstName,
                      data.secondName,
                      data.firstSurname,
                      data.secondSurname,
                      data.email,
                      data.firmaB64,
                      password,
                      data.emailInstitucional
                    )
                    .subscribe({
                      next: (editProfileRes) => {
                        if (!editProfileRes) {
                          return;
                        }
                        this.crudService.close(res.dialogRef);
                        this.crudService.close(response.dialogRef);
                        this.snackbar.show({
                          mensaje: this.translate.instant(
                            "CRUD_MESSAGES.ON_SAVE_CHANGES_NOT_RECORD"
                          ),
                          tipo: "success",
                        });

                        /**
                         * actualiza los nuevos datos de la persona en el Store
                         */
                        this.store.dispatch(
                          editPersonData({
                            attributes: {
                              PRIMER_NOMBRE: data.firstName,
                              SEGUNDO_NOMBRE: data.secondName,
                              PRIMER_APELLIDO: data.firstSurname,
                              SEGUNDO_APELLIDO: data.secondSurname,
                              EMAIL_PER: data.email,
                              EMAIL_CORP: data.emailInstitucional,
                            },
                          })
                        );
                      },
                      error: (err) => this.snackbar.showBackError(err),
                    });
                } else if (didEditImage) {
                  this.imageService
                    .updateFoto(data.userImage.file, this.personData.ID)
                    .subscribe({
                      next: (editImageRes) => {
                        if (!editImageRes) {
                          return;
                        }
                        this.crudService.close(res.dialogRef);
                        this.crudService.close(response.dialogRef);

                        this.imageService.b64UserImage$.next(
                          data.userImage.blob
                        );
                        this.snackbar.show({
                          mensaje: this.translate.instant(
                            "CRUD_MESSAGES.ON_SAVE_CHANGES_NOT_RECORD"
                          ),
                          tipo: "success",
                        });
                      },
                      error: (err) => this.snackbar.showBackError(err),
                    });
                } else {
                  this.crudService.close(response.dialogRef);
                  this.snackbar.show({
                    mensaje: this.translate.instant(
                      "CRUD_MESSAGES.NONE_FIELD_EDITED"
                    ),
                    tipo: "warning",
                  });
                }
              }
            });
        }
      });
  }

  changePassword() {
    this.crudService
      .show({
        title: this.translate.stream(
          "GENERAL_PAGES_FROM_LAYOUT.TOP_NAV_BAR_MESSAGES.CHANGE_PASSWORD.TITLE"
        ),
        component: ChangePasswordComponent,
        maxWidth: "400px",
        dataComponent: {},
        actions: {
          primary: this.translate.stream("BUTTONS_NAMES.SAVE_BUTTON"),
          secondary: this.translate.stream("BUTTONS_NAMES.CANCEL_BUTTON"),
        },
      })
      .subscribe((res) => {
        if (res.estado) {
          const data = res.data;
          if (data.password === data.confirmPassword) {
            this.resetPasswordService
              .changePassword(
                this.idUser,
                data.currentPassword,
                data.password,
                data.confirmPassword
              )
              .subscribe((res) => {
                if (res) {
                  this.snackbar.show({
                    mensaje: this.translate.instant(
                      "GENERAL_PAGES_FROM_LAYOUT.TOP_NAV_BAR_MESSAGES.CHANGE_PASSWORD.SNACKBAR_MESSAGES.ON_SUCCESS"
                    ),
                    tipo: "success",
                  });
                  this.crudService.close();
                  setTimeout(() => {
                    this.auth.logout();
                  }, 3000);
                }
              });
          } else {
            this.snackbar.show({
              mensaje: this.translate.instant(
                "GENERAL_PAGES_FROM_LAYOUT.TOP_NAV_BAR_MESSAGES.CHANGE_PASSWORD.SNACKBAR_MESSAGES.ON_PASSWORD_NOT_MATCH"
              ),
              tipo: "error",
            });
          }
        }
      });
  }

  setDefaultRole() {
    this.crudService
      .show({
        title: this.translate.stream(
          "GENERAL_PAGES_FROM_LAYOUT.SET_DEFAULT_ROL.MODAL.TITLE"
        ),
        component: SetDefaultRoleComponent,
        maxWidth: "500px",
        dataComponent: {
          idUser: this.idUser,
        },
        actions: {
          primary: this.translate.stream("BUTTONS_NAMES.SAVE_BUTTON"),
          secondary: this.translate.stream("BUTTONS_NAMES.CANCEL_BUTTON"),
        },
      })
      .subscribe((res) => {
        if (res.estado) {
          this.rolService
            .setDefaultUserRol(res.data.idUserRol)
            .subscribe((res) => {
              if (res) {
                this.snackbar.show({
                  mensaje: this.translate.instant(
                    "GENERAL_PAGES_FROM_LAYOUT.SET_DEFAULT_ROL.MODAL.SNACKBAR_MESSAGES.ON_SUCCESS"
                  ),
                  tipo: "success",
                });
                this.store.dispatch(getRolData());
                this.crudService.close();
              }
            });
        }
      });
  }

  getFullRoute(route) {
    const urlArray = window.location.href.split("/");
    const url =
      urlArray[0] +
      "//" +
      urlArray[2] +
      (!environment.production ? "/" + urlArray[3] : "") +
      route;
    return url;
  }

  help() {
    window.open("https://www.youtube.com/channel/UCNcR9e7okHj6OCsmI0UELFg");
  }

  private isValidIcon(value: string) {
    try {
      return JSON.parse(value).value !== "";
    } catch (e) {
      return false;
    }
  }
}
