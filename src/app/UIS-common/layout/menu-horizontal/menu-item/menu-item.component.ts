import { Component, Input, ViewChild } from "@angular/core";

@Component({
  selector: "app-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"],
})
export class MenuItemComponent {
  @Input() items: any[];
  @ViewChild("childMenu", { static: true }) public childMenu;

  constructor() {}

  public orderBy(itemsArr: any[]) {
    return itemsArr.sort((a, b) =>
      a.ORDEN > b.ORDEN ? 1 : a.ORDEN === b.ORDEN ? 0 : -1
    );
  }
}
