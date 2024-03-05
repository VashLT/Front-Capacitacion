import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Menu } from "./models/models";
import { environment } from "src/environments/environment";
import { MatAccordion } from "@angular/material/expansion";
import { TranslateService } from "@ngx-translate/core";
import { Confirm } from "@uis/uis-lib/services/confirm";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { RolService } from "../header/components/set-default-role/services/rol.service";

@Component({
  selector: "app-custom-menu-panel",
  templateUrl: "./custom-menu-panel.component.html",
  styleUrls: ["./custom-menu-panel.component.scss"],
})
export class CustomMenuPanelComponent implements OnInit {
  moduleApps: Menu[] = [];
  mocker: number[] = Array(6).fill(0);
  searchTerm: string;
  filteredModuleApps: Menu[] = [];
  menuPanelApps: Menu[] = [];
  selectedModule: Menu | undefined;
  modules: Menu[] = [];

  @ViewChild("menuPanel") menuPanel: ElementRef<any>;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Output() closeMenuConfig: EventEmitter<any> = new EventEmitter();

  constructor(
    private service: RolService,
    private translate: TranslateService,
    private confirm: Confirm,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.service.getAllMenus().subscribe((data) => {
      // Formar link del this.menuPanel, extraer icono
      this.modules = [...data];
      this.modules.forEach((module) => {
        module.allChecked = true;
        module.icono = JSON.parse(module.icono).value;
        module.topMenus = [];

        // module.hijos = module.hijos.filter((submodule) => submodule.hijos);

        module.hijos.forEach((submodule) => {
          submodule.checked = true;

          if (!submodule.hijos) {
            submodule.hijos = [submodule];
          }

          submodule.hijos.forEach((rtm) => {
            if (module.ruta !== "/main-menu") {
              rtm.ruta = module.ruta
                ? `${module.ruta}/#${rtm.ruta}`
                : `/authmf/#/auth`;
            } else {
              rtm.ruta = `${submodule.ruta}/#${rtm.ruta}`;
            }

            rtm.ruta = this.getFullRoute(rtm.ruta);
            if (rtm?.icono && this.isValidIcon(rtm.icono)) {
              rtm.icono = JSON.parse(rtm.icono).value;
            } else {
              rtm.icono = "widgets";
            }

            if (rtm.tag) {
              rtm.nombre = rtm.nombre + " (" + rtm.tag + ")";
            }
          });
          module.topMenus.push(
            ...submodule.hijos.filter((menu) => menu.rightTopMenu)
          );
        });
      });
    });
  }

  upDateTopMenus() {
    this.modules.forEach((module) => {
      if (module.id === this.selectedModule.id) {
        module.topMenus = [...this.menuPanelApps];
      }
    });
  }

  // Drag and drop events between menus from allMenus and menuPanel

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.modules, event.previousIndex, event.currentIndex);
  }

  transferAppToList(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // Dropped inside the same drop list, update the order of apps in the list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the order in menuPanel
      if (event.container.element.nativeElement.id === "menuPanel") {
        this.upDateTopMenus();
      }
    } else {
      // Handle when the target container has reached the maximum limit
      // For example, display an error message or prevent the transfer
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.upDateTopMenus();
      this.applyFilter();
    }
  }

  checkFullList(item: any, drop: CdkDropList<any[]>) {
    return drop.data.length < 6;
  }

  private isValidIcon(value: string) {
    try {
      return JSON.parse(value).value !== "";
    } catch (e) {
      return false;
    }
  }

  onSubmoduleChange(module: Menu) {
    this.moduleApps = [];
    module.hijos
      .filter((submodule) => submodule.checked)
      .forEach((submodule) => {
        this.moduleApps.push(
          ...submodule.hijos?.filter((menu) => !module.topMenus.includes(menu))
        );
      });
    this.filteredModuleApps = this.moduleApps;
    module.allChecked = module.hijos.every((submodule) => submodule.checked);
  }

  selectAllCheckboxes(module: Menu) {
    module.allChecked = !module.allChecked;
    module.hijos.forEach((submodule) => {
      submodule.checked = module.allChecked;
    });
    this.onSubmoduleChange(module);
  }

  onModuleChange(module: Menu) {
    module.expanded = true;
    this.selectedModule = module;
    this.moduleApps = [];
    this.menuPanelApps = [];
    this.searchTerm = "";

    this.selectedModule.hijos.forEach((submodule) => {
      if (submodule.checked && submodule.hijos) {
        this.moduleApps.push(
          ...submodule.hijos.filter((app) => !module.topMenus.includes(app))
        );
      }
      this.menuPanelApps = [...module.topMenus];
    });

    this.filteredModuleApps = this.moduleApps;
  }

  onModuleClosed(module: Menu) {
    module.expanded = false;
    if (this.modules.every((m: any) => !m.expanded)) {
      this.selectedModule = null;
    }
  }

  applyFilter(filterValue: string = this.searchTerm) {
    this.filteredModuleApps = this.moduleApps.filter((app) =>
      app.nombre.toLowerCase().includes(filterValue.trim().toLowerCase())
    );
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

  saveChanges() {
    const updateObject = this.createUpdateObject();

    this.service.updateMenus(updateObject).subscribe(() => {
      this.snackbar.show({
        mensaje: this.translate.instant(
          "MENU_PANEL.MANAGEMENT.UPDATED_MESSAGE"
        ),
        tipo: "success",
      });
    });

    this.closeMenuConfig.emit();
  }

  createUpdateObject() {
    const list = [];
    this.modules.map((module) =>
      list.push({
        idModulo: module.id,
        apps: module.topMenus.map((menu) => menu.id),
      })
    );
    return list;
  }

  cancel() {
    this.confirm
      .show({
        title: this.translate.instant(
          "MENU_PANEL.MANAGEMENT.CANCEL_CONFIRMATION"
        ),
        content: `${this.translate.instant(
          "MENU_PANEL.MANAGEMENT.DISCARD_DESCRIPTIONS"
        )}`,
        actions: {
          primary: this.translate.instant("BUTTONS_NAMES.ACCEPT_BUTTON"),
        },
      })
      .then((res) => {
        if (res) {
          this.closeMenuConfig.emit();
        }
      });
  }
}
