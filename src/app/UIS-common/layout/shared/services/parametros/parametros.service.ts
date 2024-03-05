import { map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Parametro } from "./models/parametro.model";
import { mockParametrosResponse } from "@UIS-common/layout/store/mocks/parametros.mock";

/**
 * Servicio para el manejo de parámetros.
 */
@Injectable()
export class ParametrosService {
  /**
   * Constructor del servicio.
   *
   * @param http - Servicio de http.
   */
  constructor(private http: HttpClient) {}

  /**
   * Función para obtener el valor de un parámetro.
   *
   * @param identifier - Identificador del parámetro.
   * @returns - Valor del parámetro.
   */
  getParametroByIdentifier(identifier: string) {
    return this.http
      .get<string>(
        `${environment.urlBackSettingsDgth}/detalleParametro/valorParametroActivo/${identifier}`
      )
      .pipe(map((res: any) => res.valor));
  }

  /**
   * Función para obtener valores de parámetros.
   *
   * @param values - PArámetros a cargar.
   * @returns - Valores de los parámetros.
   */
  getParametrosByValues(_values: string[]) {
    // return this.http
    //   .post(
    //     `${environment.urlBackSettingsDgth}/detalleParametro/findValorByListIdentificador`,
    //     values
    //   )
    return of(mockParametrosResponse).pipe(
      map((res: Parametro[]) => {
        const parametros: { [key: string]: string } = {};
        res.forEach((parametro) => {
          parametros[parametro.identificador] = parametro.valor;
        });
        return parametros;
      })
    );
  }
}
