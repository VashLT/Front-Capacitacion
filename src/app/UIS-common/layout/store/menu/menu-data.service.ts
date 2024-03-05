// import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { MenuParents } from "../../core/bootstrap/models/menu-parent.model";
import { CurrentNavigation } from "./menu-data.model";
import { mockMenusResponse } from "../mocks/menu.mock";

@Injectable()
export class MenuDataService {
  menuParents: MenuParents;
  // constructor(private http: HttpClient, private snackbar: SnackbarService) {}
  constructor(private snackbar: SnackbarService) {}

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
