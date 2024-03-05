import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { Observable, catchError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CrossMenuService {
  constructor(private http: HttpClient, private snackbar: SnackbarService) {}

  /**
   * Método para obtener el menu cruzado.
   */

  getCrossMenu(idCrossMenu): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${environment.urlBackCore}/rutaNavegacion/getCrossMenu?idMenuCruzado=${idCrossMenu}`
      )
      .pipe(
        catchError((err) => {
          if (err) {
            this.snackbar.showBackError(err);
          }
          return [];
        })
      );
  }
}
