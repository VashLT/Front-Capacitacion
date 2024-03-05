import { Inject, Injectable, Optional } from "@angular/core";
import { FUNCTION_TO_LOAD_PARAMS } from "../injection-tokens/params-to-load-function-token";
import { PARAMETROS_TO_LOAD_ON_ONIT } from "./parametros-to-load";

/**
 * Servicio que maneja los parámetros a cargar dentro del layout.
 */
@Injectable()
export class ParametrosToLoadService {
  /**
   * Parámetros a cargar en el layout.
   */
  private currentParams;

  /**
   * Función para setear los parámetros a cargar.
   *
   * @param params - Parámetros a cargar.
   */
  setParamsToLoad(params: string[]) {
    this.currentParams = this.functionParams(params);
  }

  /**
   * Función para obtener los parámetros a cargar.
   *
   * @returns - Parámetros a cargar.
   */
  getParamsToLoad() {
    return this.currentParams;
  }

  /**
   * Constructor de la clase.
   * A la función siempre se le agregan los PARAMETROS_TO_LOAD_ON_ONIT ya que estos son requeridos por layout.
   *
   * @param functionParams - Función para setear los parámetros a cargar.
   */
  constructor(
    @Optional()
    @Inject(FUNCTION_TO_LOAD_PARAMS)
    private functionParams: (...args: any[]) => string[]
  ) {
    if (!functionParams) {
      this.functionParams = () => PARAMETROS_TO_LOAD_ON_ONIT;
    } else {
      this.functionParams = (params: string[]) => [
        ...PARAMETROS_TO_LOAD_ON_ONIT,
        ...functionParams(params),
      ];
    }
    this.currentParams = this.functionParams(PARAMETROS_TO_LOAD_ON_ONIT);
  }
}
