import { Component } from "@angular/core";
import { MenuService } from "../../core";
import { Menu } from "../../core/bootstrap/models/menu.model";

@Component({
  selector: "app-menu-horizontal",
  templateUrl: "./menu-horizontal.component.html",
  styleUrls: ["./menu-horizontal.component.scss"],
})
export class MenuHorizontalComponent {
  public menues: Menu[] = [];
  constructor(public menuService: MenuService) {
    this.menuService.menuHorizontal$.subscribe((value: any) => {
      this.menues = value;
    });
  }
}
