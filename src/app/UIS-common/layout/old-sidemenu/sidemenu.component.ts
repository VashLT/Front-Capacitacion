import { Component, Input, ViewEncapsulation } from "@angular/core";

import { MenuService } from "../core";
import { Menu } from "../core/bootstrap/models/menu.model";
import { SearchPipe } from "../sidebar/pipes/search.pipe";
import { of } from "rxjs";
import { MenuDataService } from "../store/menu/menu-data.service";

@Component({
  selector: "app-old-sidemenu",
  templateUrl: "./sidemenu.component.html",
  styleUrls: ["./sidemenu.component.scss"],
  providers: [SearchPipe],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent {
  @Input() ripple = false;

  constructor(public menu: MenuService, public userMenu: MenuDataService) {
    this.menu$.subscribe((x) => {
      this.menulist = x;
    });
    this.userMenus$.subscribe((x) => {
      this.menuUserList = x;
    });
  }
  /**
   * Arrays donde iran los menús
   */
  menuUserList: Menu[] = [];
  menulist: Menu[] = [];

  /**
   * observables listos para renderizar en el html
   */
  menu$ = this.menu.getAll(); /**Rutas navegacion */
  userMenus$ = this.menu.getMenuUserAll(); /**Rutas usuario */
  menuStatic$ = this.menu.getAll(); /**Menú estático */

  buildRoute = this.menu.buildRoute;
  filtro_valor = "";

  // buscador
  searchMenu(e) {
    /**Arrays de filtrado con un elemento (dicho elemento sirve para evitar bug del mat-error),
     *  para evitar la mutación de data */
    this.filterItems = [1];
    this.filterMenuItems = [1];

    const str = e.normalize("NFD").replace(/[\u0300-\u036f ]/g, "");
    /** Filtrando los menus de rutas navegacion */
    this.filterMenus(this.menulist, str.toLowerCase());
    /** Filtrando los menus de rutas  */
    this.filterUserMenus(this.menuUserList, str.toLowerCase());
    /**Retorna observables para mantener el comportamiento */
    this.menu$ = of(this.filterItems);
    this.userMenus$ = of(this.filterMenuItems);
  }

  filterItems = [];
  filterMenuItems = [];

  // Filtro recursivo entre elementos de rutas navegacion
  filterMenus(array, query) {
    array.forEach((e) => {
      let str = e.name.normalize("NFD").replace(/[\u0300-\u036f ]/g, "");
      if (str.toLowerCase().includes(query)) {
        this.filterItems.push(e);
        return this.filterItems;
      } else {
        let hijos = e.children ? e.children : null;
        if (hijos != null) {
          this.filterMenus(hijos, query);
        }
      }
    });
    // const getNodes = (result, object) => {
    //   if (object.query === query) {
    //     result.push(object);
    //     return result;
    //   }
    //   if (Array.isArray(object.nodes)) {
    //     const nodes = object.nodes.reduce(getNodes, []);
    //     if (nodes.length) {
    //       result.push({ ...object, nodes });
    //     }
    //   }
    //   return result;
    // };

    // return array.reduce(getNodes, []);
  }
  // Filtro recursivo entre elementos de rutas usuario
  filterUserMenus(array, query) {
    array.forEach((e) => {
      let str = e.name.normalize("NFD").replace(/[\u0300-\u036f ]/g, "");
      if (str.toLowerCase().includes(query)) {
        this.filterMenuItems.push(e);
      } else {
        let hijos = e.children ? e.children : null;
        if (hijos != null) {
          this.filterUserMenus(hijos, query);
        }
      }
    });
  }

  // función para reiniciar el buscador
  reset() {
    this.filtro_valor = "";
    this.searchMenu(this.filtro_valor);
  }

  // Verifica si el usuario tiene o no rutas usuario
  showMenu() {
    if (this.menuUserList.length === 0) {
      return false;
    } else {
      return true;
    }
  }
  // Mensaje que indica que no se encontró el menú
  checkSearch() {
    if (this.filterItems?.length == 1) {
      return true;
    }
  }

  checkMenuSearch() {
    if (this.menuUserList.length == 0) {
      return false;
    } else {
      if (this.filterMenuItems?.length == 1) {
        return true;
      }
    }
  }
}
