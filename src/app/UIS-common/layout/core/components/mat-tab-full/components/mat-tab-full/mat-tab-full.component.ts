import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { MatTabChangeEvent, MatTabGroup } from "@angular/material/tabs";
import { TranslateService } from "@ngx-translate/core";
import { CrudService } from "@uis/uis-lib/services/crud";
import { MatTabFullContentDirective } from "../../directives/mat-tab-full-content/mat-tab-full-content.directive";
import { CrudCreateTabComponent } from "../crud-create-tab/crud-create-tab.component";
import { Confirm } from "@uis/uis-lib/services/confirm";

/**
 * Componente utilizado para crear pestañas (tabs) con un estilo diferente, estas pueden ser variables o estaticas.
 *
 * Estaticas -> siempre se tiene la misma cantidad de tabs
 *
 * Variables -> se puede agregar o eliminar tabs.
 *
 * El componente por defecto crea la ventana modal para crear nuevas pestañas, pero se puede desactivar con la propiedad showModalCreate.
 * @since 1.0
 */
@Component({
  selector: "app-mat-tab-full",
  templateUrl: "./mat-tab-full.component.html",
  styleUrls: ["./mat-tab-full.component.scss"],
})
export class MatTabFullComponent {
  /**
   * muestra una tab para agregar nuevas tabs.
   *
   * se emite el metodo @see addTab que indica que se presiono en crear nueva tab.
   */
  @Input()
  showAddTab: boolean = true;

  /**
   * muestra el boton de cerrar las tabs.
   *
   * En caso de ser true, se utiliza el evento closeTab para indicar cuando
   * se presiono el boton de cerrar una tab.
   */
  @Input()
  showCloseTab: boolean = true;

  /**
   * propiedad de @see MatTabGroup.preserveContent que permite NO eliminar
   * el contenido del DOM cada que se cambia el tab selecionado.
   */
  @Input()
  preserveContent: boolean = true;

  /**
   * muestra el modal por defecto de creacion de pestañas. @see CrudCreateTabComponent
   */
  @Input()
  showModalCreate: boolean = true;

  /**
   * indica si se debe mostrar una ventana modal de confirmacion al intentar cerrar una tab.
   */
  @Input()
  preventCloseTab: boolean = false;

  /**
   * evento que es llamado cuando se cambia el indice de la pestaña.
   */
  @Output()
  selectedIndexChange: EventEmitter<number> = new EventEmitter();

  IndexChange(value: number) {
    this.selectedIndexChange.emit(value);
  }

  /**
   * evento que es llamado cuando se cambia de pestaña.
   */
  @Output()
  selectedTabChange: EventEmitter<MatTabChangeEvent> = new EventEmitter();

  TabChange(value: MatTabChangeEvent) {
    this.selectedTabChange.emit(value);
  }

  /**
   * evento que es llamado cuando se da click en crear una nueva tab.
   *
   * En este evento se debe implementar la logica de que pasa al presionar el boton de crear una tab.
   */
  @Output()
  addTab: EventEmitter<any> = new EventEmitter();

  /**
   * cuando se da click en el boton de close de una tab.
   * se envia el indice del tab como argumento.
   */
  @Output()
  closeTab: EventEmitter<number> = new EventEmitter();

  /**
   * retorna el componente MatTabGroup luego de ser renderizado.
   */
  @Output()
  matTabGroup: EventEmitter<MatTabGroup> = new EventEmitter();

  @ViewChild("tabgroup")
  set SetMatTabGroup(value: MatTabGroup) {
    if (this.triggerAddTab && value) {
      value.selectedIndex = value._allTabs.length - 2;
      this.triggerAddTab = false;
    }
    this._matTabGroup = value;
    this.matTabGroup.emit(value);
  }

  _matTabGroup: MatTabGroup;

  @ContentChildren(MatTabFullContentDirective)
  content: QueryList<MatTabFullContentDirective>;

  _selectedIndex: number = 0;
  /**
   * trigger utilizado para detectar cuando la vista cambiar porque se agrego una tab y asi poder cambiar el indice de la tab.
   */
  triggerAddTab: boolean = false;

  /**
   * label utilizado para el boton de crear pestaña.
   */
  labelCreateTab: string = "Crear pestaña";

  /**
   * css utilizado para saber cuantas tabs se estan mostrando para dibujar la linea inferior derecha al lado de las tabs.
   */
  styleLineTab: string = "uis-tab-full-1";

  constructor(
    private crud: CrudService,
    private confirm: Confirm,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * metodo que es llamada para abrir el modal de creacion de tabs.
   */
  modalAddTab() {
    if (this.showModalCreate) {
      this.crud
        .show({
          component: CrudCreateTabComponent,
          dataComponent: { close: () => this.crud.close() },
          actions: {
            primary: this.translate.instant("BUTTONS_NAMES.ADD_ONLY"),
            secondary: this.translate.instant("BUTTONS_NAMES.CANCEL_BUTTON"),
          },
          useStandarsUXToViewMode: true,
          title: this.translate.instant(this.labelCreateTab),
        })
        .subscribe((resultado) => {
          if (resultado.estado) {
            this.addTab.emit(resultado.data);
            this.styleLineTab = `uis-tab-full-${
              this._matTabGroup?._allTabs.length + 1
            }`;
            this.triggerAddTab = true;
            this.crud.close();
          }
        });
    } else {
      this.addTab.emit(null);
    }
  }

  /**
   * abre el modal si se tiene la propiedad preventCloseTab en true.
   * @param index indice de la tab a cerrar.
   */
  modalCloseTab(index) {
    if (this.preventCloseTab) {
      this.confirm
        .show({
          title: this.translate.instant("MESSAGES.CONFIRM_CLOSE_TAB_TITLE"),
          content: this.translate.instant("MESSAGES.CONFIRM_CLOSE_TAB"),
        })
        .then((res) => {
          if (res) {
            this.closeTabAction(index);
          }
        });
    } else {
      this.closeTabAction(index);
    }
  }

  /**
   * indice de la tab a cerrar.
   */
  closeTabAction(index) {
    if (this._selectedIndex > 0) {
      this._selectedIndex--;
    }
    this.styleLineTab = `uis-tab-full-${
      this._matTabGroup?._allTabs.length - 1
    }`;
    this.closeTab.emit(index);
  }
}
