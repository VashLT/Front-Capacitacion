import { Component, Inject, OnInit, Optional } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { NavigationStart, Router } from "@angular/router";
import { Menu } from "../../../core/bootstrap/models/menu.model";
import { MenuDataService } from "../../../store/menu/menu-data.service";
import { filter, map, Observable, Subscription } from "rxjs";
import { TreeControl } from "./classes/tree-control";
import { Nodo } from "./models/nodo.model";
import { DatabaseService } from "./services/database.service";
import { APP_BASE_HREF } from "@angular/common";
import { CrossMenuService } from "./services/cross-menu.service";
import { loadRoute } from "./utils/load-route-not-mfe";
import { urlAssets } from "src/environments/utils/utils-not-mf";
@Component({
  selector: "app-sidemenu-tree",
  templateUrl: "./sidemenu-tree.component.html",
  styleUrls: ["./sidemenu-tree.component.scss"],
})
export class SidemenuTreeComponent implements OnInit {
  /**
   * Conversor de nodos a data original
   */
  public mapper = new Map<Nodo, Menu>();

  /**
   * Conversor de los datos a nodos
   */
  _transformer = (node: Menu, level: number) => {
    const t: any = {
      id: node.ID,
      expandable: node.children?.length > 0,
      name: node.TAG ? `${node.name} (${node.TAG})` : node.name,
      level,
      visible: true,
      icon: level === 0 ? node.icon : null,
      route: node.route,
      idMenuCruzado: node.ID_MENU_CRUZADO,
    };

    this.mapper.set(t, node);
    return t;
  };

  /**
   * Control de los nodos del arbol
   */
  treeControl: TreeControl;

  selectedIdNode: number;

  /**
   * Convierte los datos en nodos para el árbol
   */
  treeFlattener: MatTreeFlattener<Menu, Nodo>;

  /**
   * Saber si un nodo tiene hijos
   */
  hasChild = (_: number, node: Nodo) => node.expandable && node.level > 0;

  /**
   * Saber si un nodo es el nodo raiz (padre de todo los nodos)
   */
  isRoot = (_: number, node: Nodo) => node.level === 0;

  /**
   * Fuente de datos del árbol
   */
  dataSource: MatTreeFlatDataSource<Menu, Nodo>;

  /**
   * subscripción al servicio de base de datos
   */
  databaseSub: Subscription;

  /**
   * Estado de los nodos, expandidos o colapsados
   */
  nodesState = new Map<string, Nodo[]>();

  /**
   * Máxima cantidad de caracteres que se muestran antes de colocar '...'
   */
  menuNameMaxLength = 50;

  /**
   * Padding adicional que incrementa por niveles
   */
  deltaPadding = 15;

  /**
   * servicio para la base de datos de nodos a nivel de frontend
   */
  private _database: DatabaseService;

  constructor(
    private menuData: MenuDataService,
    private router: Router,
    private crossMenuService: CrossMenuService,
    @Optional() @Inject(APP_BASE_HREF) public base: string
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this._transformer,
      (node: Nodo) => node.level,
      (node: Nodo) => node.expandable,
      (node: Menu) => node.children
    );

    this.treeControl = new TreeControl(
      (node) => node.level,
      (node) => node.expandable
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    /**
     * asegura diferentes instancias del servicio de bases de datos
     * para varios componentes arbol
     */
    this._database = new DatabaseService();
    this.databaseSub = this._database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });

    this.nodesState.set("expandedNodes", []);
    this.nodesState.set("collapsedNodes", []);
  }

  ngOnInit(): void {
    /**
     * Escucha a los cambios de navegacion
     */
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) =>
        this.expandCurrentNavigation(event.url)
      );
  }

  setUpData(data: Menu[], collapsed = true) {
    this._database.initialize(data);
    if (collapsed) {
      this.treeControl.collapseAll();
    }
  }

  filterNodesByName(filter: string): boolean {
    if (!filter) {
      this.clearFilter();
      return true;
    }

    const norm_filter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const re = new RegExp(`(${norm_filter})`, "igm");

    /**
     * conjunto con los ids de todos los nodos que conforman el arbol filtrado
     */
    const visibleNodeIds: Set<number> = new Set();

    const filteredNodes = this.treeControl.dataNodes.filter(
      (node: Nodo) =>
        typeof node.name !== "string" ||
        !re.test(node.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    );

    const visibleNodes = this.treeControl.dataNodes.filter(
      (node: Nodo) =>
        typeof node.name === "string" &&
        re.test(node.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    );

    filteredNodes.map((node) => (node.visible = false));
    visibleNodes.forEach((node) => {
      node.visible = true;
      this.treeControl.applyDirectAscendants(
        node,
        (nodo) => {
          nodo.visible = true;
          this.treeControl.expand(nodo);
        },
        0,
        visibleNodeIds
      );
      this.treeControl.getDescendants(node).forEach((n) => (n.visible = true));
      this.treeControl.collapseDescendants(node);
      this.treeControl.expand(node);
    });

    if (visibleNodes.length === 0) {
      return false;
    }
  }

  clearFilter() {
    this.treeControl.dataNodes.forEach((node) => (node.visible = true));
  }

  /**
   * Expande los menus para mostrar la navegación actual
   */
  expandCurrentNavigation(url?: string) {
    if (!url) {
      url = this.router.url;
    }
    url = url.split("?")[0];

    if (urlAssets()) {
      let segments = url.split("/");
      segments = segments.slice(2);
      url = "/" + segments.join("/");
    }
    if (url === "/") {
      this.selectedIdNode = undefined;
    }
    const targetNode = this.treeControl.dataNodes.filter(
      (node) => node.route === url
    );
    if (!targetNode.length) {
      return;
    }
    this.selectedIdNode = targetNode[0].id;
    this.treeControl.applyDirectAscendants(targetNode[0], (n) =>
      this.treeControl.expand(n)
    );
  }

  /**
   * Guardar el estado de los nodos del árbol
   */
  saveNodesState() {
    this.nodesState.set("expandedNodes", new Array<Nodo>());
    this.nodesState.set("collapsedNodes", new Array<Nodo>());
    this.treeControl.dataNodes.forEach((node) => {
      if (node.expandable && this.treeControl.isExpanded(node)) {
        this.nodesState.get("expandedNodes").push(node);
      } else {
        this.nodesState.get("collapsedNodes").push(node);
      }
    });
  }

  /**
   * Restablece el estado de los nodos del árbol
   */
  restoreNodesState() {
    this.nodesState.get("expandedNodes").forEach((node) => {
      this.treeControl.expand(
        this.treeControl.dataNodes.find((n) => n.id === node.id)
      );
    });
    this.nodesState.get("collapsedNodes").forEach((node) => {
      this.treeControl.collapse(
        this.treeControl.dataNodes.find((n) => n.id === node.id)
      );
    });
  }

  /**
   * Si un nodo es padre de la ruta actual
   * @param name ruta
   * @returns
   */
  isParent(name: string): boolean {
    if (!this.menuData.menuParents) {
      return false;
    }
    let contained = false;
    let url = this.router.url.split("?")[0];
    if (urlAssets()) {
      let segments = url.split("/");
      segments = segments.slice(2);
      url = "/" + segments.join("/");
    }
    this.menuData.menuParents[url]?.every((item) => {
      if (item.name === name) {
        contained = true;
        return false;
      }
      return true;
    });
    return contained;
  }

  /**
   * Expandir y colapsar custom para los menus
   * Expande o collapsa hijos o padres hasta que tengan más de un hijo o tios
   * @param node nodo
   */
  toggleNode(node: Nodo) {
    this.treeControl.isExpanded(node)
      ? this.treeControl.collapseNode(node)
      : this.treeControl.expandNode(node);
  }

  getCrossMenu(idCrossMenu: number): Observable<string> {
    return this.crossMenuService
      .getCrossMenu(idCrossMenu)
      .pipe(map((res: any) => res.rutaBase));
  }
  ruta(node: any) {
    if (!node.expandable) {
      this.selectedIdNode = node.id;
    }
    if (node.idMenuCruzado && node.id > node.idMenuCruzado) {
      this.getCrossMenu(node.idMenuCruzado).subscribe((rutaCruzada: string) => {
        loadRoute(node.route, this.router, rutaCruzada);
      });
    } else {
      const route = node.expandable
        ? null
        : (this.base ? "/" + this.base : "") + node.route;
      if (route) {
        this.router.navigate([route]);
      }
    }
  }
}
