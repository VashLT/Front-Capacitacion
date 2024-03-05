import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { Loseta } from "../models/loceta.model";
import { BehaviorSubject, Observable } from "rxjs";
import { mockModulesResponse } from "@UIS-common/layout/store/mocks/modules.mock";

@Injectable({
  providedIn: "root",
})
export class LosetasService {
  private _losetas: BehaviorSubject<Loseta[]> = new BehaviorSubject<Loseta[]>(
    []
  );

  constructor(private http: HttpClient, private snackbar: SnackbarService) {}

  async getLosetas(): Promise<Loseta[]> {
    try {
      // const losetas = await this.http
      //   .get<Loseta[]>(`${environment.urlBackAuth}/userroles/modules`)
      //   .pipe(
      //     catchError((error) => {
      //       this.snackbar.showBackError(error);
      //       throw error;
      //     })
      //   )
      //   .toPromise();

      const losetas = mockModulesResponse;

      this._losetas.next(losetas);
      return losetas;
    } catch (error) {
      console.error(error);
    }
  }

  getValuesLosetas(): Observable<Loseta[]> {
    return this._losetas;
  }
}
