// import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { MenuParents } from "../../core/bootstrap/models/menu-parent.model";
import { CurrentNavigation } from "./menu-data.model";
import { mockMenusResponse } from "../mocks/menu.mock";
import { menus } from "src/app/capacitacion/sidemenu";


@Injectable()
export class MenuDataService {
  menuParents: MenuParents;
  // constructor(private http: HttpClient, private snackbar: SnackbarService) {}
  constructor(private snackbar: SnackbarService) { }

  getMenuData(_slug: string): Observable<CurrentNavigation> {
    // return this.http
    //   .get<CurrentNavigation>(
    //     `${environment.urlBackAuth}/userroles/current-menu?slug=${slug ?? ""}`,
    //     {
    //       headers: {
    //         "SIMULATE-LOADER": "NONGET",
    //         BG: "rgba(255, 255, 255, 1)",
    //       },
    //     }
    //   )
    mockMenusResponse.SIDE_MENU[0].HIJOS = menus
      .map((route, i) => ({
        ID: 3 + i,
        ICONO: `{"type":"material","value":"${route.icon ? route.icon : 'star'}","class":""}`,
        ID_PADRE: 2,
        NOMBRE: route.name,
        ORDEN: null,
        ID_ROL: 48,
        ID_USUARIO: null,
        RUTA: route.path,
        ACTIVO: true,
        RESTRINGIR: null,
        MODULO_DIRECTO: true,
        RIGHT_TOP_MENU: false,
        CODIGO: null,
        RUTA_TRADUCCION: null,
        ID_MENU_CRUZADO: null,
        CREADO: "2021-04-08T14:30:52.176Z",
        MODIFICADO: "2022-09-19T21:55:43.459Z",
        TAG: null,
        WHITELIST: [],
      }));

    return of(mockMenusResponse).pipe(
      catchError((err) => {
        if (err) {
          console.error(err);
          this.snackbar.showBackError(err);
        }
        return of({} as any);
      })
    );
  }
}