import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { MenuService } from "../../../core";
import { filter } from "rxjs/operators";
import { MenuParents } from "../../../core/bootstrap/models/menu-parent.model";
import { urlAssets } from "src/environments/utils/utils-not-mf";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit {
  @Input() nav: any[] = [];
  parents: MenuParents;
  showBread: boolean = false;
  constructor(private router: Router, private menu: MenuService) {
    this.menu.parents$.subscribe((parents) => {
      if (!parents) {
        return;
      }
      this.genBreadcrumb(parents);
    });
  }

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0 && this.parents) {
      this.genBreadcrumb();
    }
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.genBreadcrumb();
      });
  }

  genBreadcrumb(parents?: MenuParents) {
    if (parents) {
      this.parents = parents;
    }
    this.showBread = false;
    if (this.router.url.split("/").length > 3) this.showBread = true;
    //si esta en microfrontend
    if (urlAssets()) {
      if (this.router.url.split("/").length <= 3) this.showBread = false;
      let url = this.router.url;
      url = url.split("?")[0];
      let segments = url.split("/");
      segments = segments.slice(2);
      url = "/" + segments.join("/");
      this.nav = this.parents[url];
    }
    //no microfrontend
    else {
      this.nav = this.parents[this.router.url.split("?")[0]];
    }
  }
}
