import { Component, EventEmitter, Input, Output } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { Menu } from "@UIS-common/layout/custom-menu-panel/models/models";

@Component({
  selector: "app-menu-panel",
  templateUrl: "./menu-panel.component.html",
  styleUrls: ["./menu-panel.component.scss"],
})
export class MenuPanelComponent {
  showMenuPanel: Boolean = false;
  @Input() set fShowMenuPanel(value: Boolean) {
    this.showMenuPanel = value;
  }
  @Input() menuPanel: Menu[] = [];
  @Output() toggleMenuConfig: EventEmitter<any> = new EventEmitter();
  @Output() toggleMenuPanel: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  moveToMenu(route) {
    const urlArray = window.location.href.split("/");
    const url =
      urlArray[0] +
      "//" +
      urlArray[2] +
      (!environment.production ? "/" + urlArray[3] : "") +
      route;
    window.open(url);
  }

  goToSettings($event) {
    this.toggleMenuConfig.emit();
    this.toggleMenuPanel.emit($event);
  }
}
