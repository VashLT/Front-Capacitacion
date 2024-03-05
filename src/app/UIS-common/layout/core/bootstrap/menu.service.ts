import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { share } from "rxjs/operators";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { MenuStoreLoaderService } from "./menu-store-loader.service";
import { MenuChildrenItem } from "./models/menu-children-item.model";
import { Menu } from "./models/menu.model";
import { MenuDataService } from "../../store/menu/menu-data.service";
import { LayoutState } from "../../store/layout-store.model";
import { RightTopMenu } from "../../store/menu/menu-data.model";

@Injectable()
export class MenuService {
  public parents$ = new BehaviorSubject({});
  public menuHorizontal$ = new BehaviorSubject<Menu[]>([]);
  public rightTopMenu$ = new BehaviorSubject<RightTopMenu[]>([]);
  private menu$ = new BehaviorSubject<Menu[]>([]);
  private userMenu$ = new BehaviorSubject<Menu[]>([]);

  constructor(
    private router: Router,
    private store: Store<LayoutState>,
    private menuStoreLoader: MenuStoreLoaderService,
    private menuData: MenuDataService
  ) {
    let succeed = this.menuStoreLoader.loadStore();
    if (succeed === false) {
      return;
    }

    this.store.select("currentNavigation").subscribe((data) => {
      if (!data) {
        return;
      }
      this.set(data.rolMenus);
      this.userMenu$.next(data.userMenus);
      this.rightTopMenu$.next(data.rightTopMenus);
      this.parents$.next(this.menuData.menuParents);
    });

    const authToken: string = localStorage.getItem("authToken");
    if (!authToken) {
      return;
    }
  }

  // Whether is a leaf menu
  private static isLeafItem(item: MenuChildrenItem): boolean {
    const cond0 = item.route === undefined;
    const cond1 = item.children === undefined;
    const cond2 = !cond1 && item.children.length === 0;
    return cond0 || cond1 || cond2;
  }

  // Deep clone object could be jsonized
  private static deepClone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  // Whether two objects could be jsonized equal
  private static isJsonObjEqual(obj0: any, obj1: any): boolean {
    return JSON.stringify(obj0) === JSON.stringify(obj1);
  }

  // Whether routeArr equals realRouteArr (after remove empty route element)
  private static isRouteEqual(
    routeArr: Array<string>,
    realRouteArr: Array<string>
  ): boolean {
    realRouteArr = MenuService.deepClone(realRouteArr);
    realRouteArr = realRouteArr.filter((r) => r !== "");
    return MenuService.isJsonObjEqual(routeArr, realRouteArr);
  }

  /** Get all the menu data. */
  getAll(): Observable<Menu[]> {
    return this.menu$.asObservable();
  }

  getMenuUserAll(): Observable<Menu[]> {
    return this.userMenu$.asObservable();
  }

  getAllKeys(o) {
    const keys = Object.create(null);

    Object.keys(o).forEach((k) => {
      if (typeof o[k] === "object") {
        return this.getAllKeys(o[k]);
      }
      keys[k] = o;
    });
    return keys;
  }

  update(object, data) {
    const keys = this.getAllKeys(object);
    Object.keys(data).forEach((k) => {
      if (keys[k] && k in keys[k]) {
        // check if key for update exist
        keys[k][k] = data[k];
      }
    });
  }

  /** Observe the change of menu data. */
  change() {
    return this.menu$.pipe(share());
  }

  /** Initialize the menu data. */
  set(menu: Menu[]): Observable<Menu[]> {
    this.menu$.next(menu);
    return this.menu$.asObservable();
  }

  setUserMenus(userMenus: Menu[]): Observable<Menu[]> {
    this.userMenu$.next(userMenus);
    return this.userMenu$.asObservable();
  }

  setHorizontal(menu: Menu[]): Observable<Menu[]> {
    this.menuHorizontal$.next(menu);
    return this.menu$.asObservable();
  }

  /** Add one item to the menu data. */
  add(menu: Menu) {
    const tmpMenu = this.menu$.value;
    tmpMenu.push(menu);
    this.menu$.next(tmpMenu);
  }

  addHorizontal(menu: Menu) {
    const tmpMenu = this.menu$.value;
    tmpMenu.push(menu);
    this.menuHorizontal$.next(tmpMenu);
  }

  /** Reset the menu data. */
  reset() {
    this.menu$.next([]);
  }

  isParent(name): boolean {
    let contained = false;
    this.parents$.getValue()[this.router.url]?.every((item) => {
      if (item.name === name) {
        contained = true;
        return false;
      }
      return true;
    });

    return contained;
  }

  resetHorizontal() {
    this.menuHorizontal$.next([]);
  }

  /** Delete empty values and rebuild route. */
  buildRoute(routeArr: string[]): string {
    let route = "";
    routeArr.forEach((item) => {
      if (item && item.trim()) {
        route += "/" + item.replace(/^\/+|\/+$/g, "");
      }
    });
    return route;
  }

  /** Get the menu item name based on current route. */
  getItemName(routeArr: string[]): string {
    return this.getLevel(routeArr)[routeArr.length - 1];
  }

  /** Get the menu level. */
  getLevel(routeArr: string[]): string[] {
    let tmpArr = [];
    this.menu$.value.forEach((item) => {
      // Breadth-first traverse
      let unhandledLayer = [{ item, parentNamePathList: [], realRouteArr: [] }];
      while (unhandledLayer.length > 0) {
        let nextUnhandledLayer = [];
        for (const ele of unhandledLayer) {
          const eachItem = ele.item;
          const currentNamePathList = MenuService.deepClone(
            ele.parentNamePathList
          ).concat(eachItem.name);
          const currentRealRouteArr = MenuService.deepClone(
            ele.realRouteArr
          ).concat(eachItem.route.split("/"));
          // Compare the full Array for expandable
          currentRealRouteArr.shift();
          if (MenuService.isRouteEqual(routeArr, currentRealRouteArr)) {
            tmpArr = currentNamePathList;
            break;
          }
          if (!MenuService.isLeafItem(eachItem)) {
            const wrappedChildren = eachItem.children.map((child) => ({
              item: child,
              parentNamePathList: currentNamePathList,
              realRouteArr: currentRealRouteArr,
            }));
            nextUnhandledLayer = nextUnhandledLayer.concat(wrappedChildren);
          }
        }
        unhandledLayer = nextUnhandledLayer;
      }
    });
    return tmpArr;
  }

  /** Add namespace for translation. */
  addNamespace(menu: Menu[] | MenuChildrenItem[], namespace: string) {
    menu.forEach((menuItem) => {
      menuItem.name = `${namespace}.${menuItem.name}`;
      if (menuItem.children && menuItem.children.length > 0) {
        this.addNamespace(menuItem.children, menuItem.name);
      }
    });
  }
}
