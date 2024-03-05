import { createReducer, on } from "@ngrx/store";
import { initialState } from "../layout-store.model";
import * as actions from "./parametros.actions";

/**
 * Se crea el reducer que escucha las 4 acciones definidas y ejecuta las funciones.
 */
const _parametrosReducer = createReducer(
  initialState.parametros,
  on(actions.getParametros, (state) => state),
  on(actions.getParametrosSuccess, (_state, action) =>
    Object.assign({}, action.parametros)
  ),
  on(actions.getParametrosError, (_state) => null),
  on(actions.clearParametros, (_state) => null)
);

/**
 * Función para obtener el reducer.
 *
 * @param state - Estado actual.
 * @param action - Acción a ejecutar.
 * @returns - Retorna el reducer.
 */
export const parametrosReducer = (state, action) =>
  _parametrosReducer(state, action);
