import {
  Component,
  OnDestroy,
  ViewChild,
  HostBinding,
  HostListener,
  ElementRef,
  Inject,
  Optional,
  ViewEncapsulation,
  OnInit,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { BreakpointObserver } from "@angular/cdk/layout";
import { OverlayContainer } from "@angular/cdk/overlay";
import { Directionality } from "@angular/cdk/bidi";
import { MatSidenav, MatSidenavContent } from "@angular/material/sidenav";

import {
  SettingsService,
  AppSettings,
  MenuService,
  AuthService,
} from "../core";
import { AppDirectionality } from "../shared";
import { NetworkStatusService } from "../core/network-status/services/status/network-status.service";

const MOBILE_MEDIAQUERY = "screen and (max-width: 959px)";
const TABLET_MEDIAQUERY =
  "screen and (min-width: 999999px) and (max-width: 99999999px)";
const MONITOR_MEDIAQUERY = "screen and (min-width: 960px)";

@Component({
  selector: "app-uis-layout",
  templateUrl: "./uis-layout.component.html",
  styleUrls: ["./uis-layout.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [SettingsService],
})
export class UisLayoutComponent implements OnInit, OnDestroy {
  options = this.settings.getOptions();
  online$ = this.newtworkStatus.online();
  showMenuConfig: boolean = false;
  /**
   * Background color del componente.
   */
  private backgroundColorValue = "transparent";
  private layoutChangesSubscription: Subscription;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;

  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  @ViewChild("content", { static: true }) content: MatSidenavContent;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  /**
   * Getter del background color.
   */
  get backgroundColor(): string {
    return this.backgroundColorValue;
  }

  /**
   * Setter del background color.
   */
  set backgroundColor(value: string) {
    this.backgroundColorValue = value;
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.checkScreenSize();
  }

  @HostBinding("class.uis-layout-content-width-fix") get contentWidthFix() {
    return (
      this.isContentWidthFixed &&
      this.options.navPos === "side" &&
      this.options.sidenavOpened &&
      !this.isOver
    );
  }

  @HostBinding("class.uis-layout-sidenav-collapsed-fix")
  get collapsedWidthFix() {
    return (
      this.isCollapsedWidthFixed &&
      (this.options.navPos === "top" ||
        (this.options.sidenavOpened && this.isOver))
    );
  }

  constructor(
    public authService: AuthService,
    public menuService: MenuService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private overlay: OverlayContainer,
    private newtworkStatus: NetworkStatusService,
    private element: ElementRef,
    private settings: SettingsService,

    @Optional() @Inject(DOCUMENT) private document: Document,
    @Inject(Directionality) public dir: AppDirectionality
  ) {
    this.dir.value = this.options.dir;
    this.document.body.dir = this.dir.value;

    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;

        this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
        this.options.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];
        this.isContentWidthFixed = state.breakpoints[MONITOR_MEDIAQUERY];
      });

    // TODO: Scroll top to container
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.content.scrollTo({ top: 0 });
      });

    // Initialize project theme with options
    this.receiveOptions(this.options);
  }

  /**
   * Resetea el background color del componente, util en el on destroy.
   */
  resetBackgroundColor() {
    this.backgroundColor = "transparent";
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleMenuConfig(param: boolean = true) {
    if (param) {
      this.showMenuConfig = !this.showMenuConfig;
    } else {
      this.showMenuConfig = false;
    }
  }

  checkScreenSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 950) {
      this.showMenuConfig = false;
    }
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  // TODO: Trigger when transition end
  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  sidenavCloseStart() {
    this.isContentWidthFixed = false;
  }

  sidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  /** Demo purposes only */

  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.toggleDarkTheme(options);
    this.toggleDirection(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === "dark") {
      this.element.nativeElement.classList.add("theme-dark");
      this.overlay.getContainerElement().classList.add("theme-dark");
    } else {
      this.element.nativeElement.classList.remove("theme-dark");
      this.overlay.getContainerElement().classList.remove("theme-dark");
    }
  }

  toggleDirection(options: AppSettings) {
    this.dir.value = options.dir;
    this.document.body.dir = this.dir.value;
  }
}
