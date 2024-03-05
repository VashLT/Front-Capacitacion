import { createAction, props } from "@ngrx/store";
import { Parametros } from "./parametros.model";

/**
 * Acción que obtiene los parámetros.
 */
export const getParametros = createAction("[Parametros] Get Data");

/**
 * En caso de éxito, se ejecuta esta acción.
 */
export const getParametrosSuccess = createAction(
  "[Parametros] Get Data Success",
  props<{ parametros: Parametros }>()
);

/**
 * En caso de error, se ejecuta esta acción.
 */
export const getParametrosError = createAction("[Parametros] Get Data Error");

/**
 * Acción que limpia los parámetros.
 */
export const clearParametros = createAction("[Parametros] Clear Data");
