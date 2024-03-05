import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { Router } from "@angular/router";
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import { MenuService } from "../../../core";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "page-header",
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: "uis-layout-page-header",
  },
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent implements OnInit {
  static ngAcceptInputType_hideBreadcrumb: BooleanInput;
  @Input() title = "";
  @Input() subtitle = "";
  @Input() nav: string[] = [];
  private _hideBreadCrumb = false;

  constructor(private router: Router, private menu: MenuService) {}

  @Input()
  get hideBreadcrumb() {
    return this._hideBreadCrumb;
  }

  set hideBreadcrumb(value: boolean) {
    this._hideBreadCrumb = coerceBooleanProperty(value);
  }

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }

    this.title = this.title || this.nav[this.nav.length - 1];
  }

  // tslint:disable-next-line: member-ordering variable-name

  genBreadcrumb() {
    const routes = this.router.url.slice(1).split("/");
    this.nav = this.menu.getLevel(routes);
    this.nav.unshift("home");
  }
}
