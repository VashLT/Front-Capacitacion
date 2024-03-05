import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { debounceTime, distinctUntilChanged, takeUntil, tap } from "rxjs";
import { Menu } from "../core/bootstrap/models/menu.model";
import { LayoutState } from "../store/layout-store.model";
import { SidemenuTreeComponent } from "./components/sidemenu-tree/sidemenu-tree.component";
import { UnsubscriptorService } from "../core/unsubscriptor-service/base-unsubscriptor";
import { projectHome } from "src/environments/project-home/project-home-not-mf";

@Component({
  selector: "app-sidemenu",
  templateUrl: "./sidemenu.component.html",
  styleUrls: ["./sidemenu.component.scss"],
})
export class SidemenuComponent
  extends UnsubscriptorService
  implements AfterViewInit, OnDestroy
{
  @ViewChild("treeRolMenus") treeRolMenus: SidemenuTreeComponent;
  @ViewChild("treeUserMenus") treeUserMenus: SidemenuTreeComponent;
  @Input() ripple = false;

  navigation: LayoutState["currentNavigation"];

  /**
   * Menú raíz para los menús con base en el rol seleccionado
   */
  headerMenus: Menu;
  /**
   * Si al filtrar no se encuentra ninguna coincidencia
   */
  matchedMenus: boolean;
  /**
   * si al filtrar los menús del usuario no se encuentra ninguna coincidencia
   */
  matchedUserMenus: boolean;
  /**
   * ruta al home del proyecto
   */
  pathHome = projectHome;
  /**
   * Valor del filtro
   */
  menusFilter = new FormControl("");
  constructor(
    private store: Store<LayoutState>,
    private cdr: ChangeDetectorRef
  ) {
    super();
    var inputPrevValue = "";
    this.menusFilter.valueChanges
      .pipe(takeUntil(this.unSubscriptor$))
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((input) => {
          /**
           * si el usuario filtra y el input estaba previamente vacío (no había filtro)
           * guarda el estado de los menús
           */
          if (inputPrevValue === "" && input !== inputPrevValue) {
            this.treeRolMenus.saveNodesState();
            this.treeUserMenus.saveNodesState();
          }
          inputPrevValue = input;
        })
      )
      .subscribe((input) => {
        if (!input) {
          this.treeRolMenus.clearFilter();
          this.treeUserMenus.clearFilter();
          this.treeRolMenus.restoreNodesState();
          this.treeUserMenus.restoreNodesState();
          this.matchedMenus = true;
          this.matchedUserMenus = true;
          return;
        }

        if (this.treeRolMenus.dataSource.data.length > 0) {
          this.matchedMenus = this.treeRolMenus.filterNodesByName(input);
        }
        if (this.treeUserMenus.dataSource.data.length > 0) {
          this.matchedUserMenus = this.treeUserMenus.filterNodesByName(input);
        }
      });
  }
  ngOnDestroy(): void {
    this.unSubscribe();
  }

  ngAfterViewInit(): void {
    this.store
      .select("currentNavigation")
      .pipe(takeUntil(this.unSubscriptor$))
      .subscribe((navigation) => {
        if (!navigation) {
          return;
        }

        navigation;
        if (navigation.rolMenus?.length === 0) {
          return;
        }

        this.headerMenus = navigation.rolMenus[0];
        /**
         * Incializa los arboles de navegación
         */
        this.treeRolMenus.setUpData(navigation.rolMenus.slice(1));
        this.treeRolMenus.expandCurrentNavigation();
        if (navigation.userMenus?.length > 0) {
          this.treeUserMenus.setUpData(navigation.userMenus.slice(1));
          this.treeUserMenus.expandCurrentNavigation();
        }
        this.cdr.detectChanges();
      });
  }
}
