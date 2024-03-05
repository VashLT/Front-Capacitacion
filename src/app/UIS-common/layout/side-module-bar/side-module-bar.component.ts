import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { Router } from "@angular/router";

import { Icon } from "./models/icon.model";
import { LosetasService } from "./service/losetas.service";
import { Loseta } from "./models/loceta.model";
import { redirectToAuth } from "src/environments/utils/utils-not-mf";
import { loadRoute } from "../sidemenu/components/sidemenu-tree/utils/load-route-not-mfe";
import { LayoutState } from "../store/layout-store.model";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-side-module-bar",
  templateUrl: "./side-module-bar.component.html",
  styleUrl: "./side-module-bar.component.scss",
})
export class SideModuleBarComponent implements OnInit {
  @HostBinding("class") defaultClass = "uis-layout-side-module-bar";
  data: Loseta[];
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() opened = true;
  selectedLosetaName: string;
  numeroMenus: number;

  constructor(
    private losetasService: LosetasService,
    private snackbar: SnackbarService,
    private router: Router,
    private store: Store<LayoutState>
  ) {
    this.calculateNumeroMenus();
  }

  ngOnInit(): void {
    this.getLosetas();
    this.store.select("currentNavigation").subscribe((data) => {
      if (!data) return;
      this.selectedLosetaName = data.rolMenus[0].name;
    });
  }

  verify(menu) {
    console.log("menu", this.selectedLosetaName, menu.NOMBRE);
  }

  getLosetas() {
    this.losetasService.getLosetas();
    this.losetasService.getValuesLosetas().subscribe({
      next: (losetas) => {
        if (!losetas) {
          return;
        }

        this.data = losetas;
        let transversal_menu = losetas.filter((loseta) => loseta.ID === 10);
        this.data = losetas
          .filter((loseta) => loseta.ID !== 10)
          .concat(transversal_menu);
      },
      error: (err) => this.snackbar.showBackError(err),
    });
  }

  loadMenus(menu: Loseta, event: Event) {
    if (menu.RESTRINGIR !== true) {
      if (menu.MODULO_DIRECTO) {
        this.loadRoute(menu.RUTA);
      } else {
        // guardar menu en el local storage para ser cargado por el modulo de autorización
        localStorage.setItem("selectedLoseta", JSON.stringify(menu));
        redirectToAuth(this.router);
      }
    } else {
      event.preventDefault();
    }
  }

  public iconParser(icon: string): Icon {
    if (icon) {
      return JSON.parse(
        icon
          .replace(
            /:\s*"([^"]*)"/g,
            (_match, p1) => ': "' + p1.replace(/:/g, "@colon@") + '"'
          )
          // Replace ':' with '@colon@' if it's between single-quotes
          .replace(
            /:\s*'([^']*)'/g,
            (_match, p1) => ': "' + p1.replace(/:/g, "@colon@") + '"'
          )

          // Add double-quotes around any tokens before the remaining ":"
          .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

          // Turn '@colon@' back into ':'
          .replace(/@colon@/g, ":")
      );
    }
    return null;
  }

  public loadRoute(route) {
    loadRoute(route, this.router, "");
  }

  // Función para calcular el número de menús
  calculateNumeroMenus() {
    this.numeroMenus = Math.floor((window.innerHeight - 130) / 90);
  }

  // Escuchar el evento resize de la ventana
  @HostListener("window:resize", ["$event"])
  onResize() {
    // Llamar a la función para recalcular el número de menús
    this.calculateNumeroMenus();
  }
}
