import { createReducer, on } from "@ngrx/store";
import { initialState } from "../layout-store.model";
import * as actions from "./roles-data.actions";

const _rolesDataReducer = createReducer(
  initialState.roles,
  on(actions.getRolData, (state) => state),
  on(actions.getRolDataSuccess, (_state, action) => new Array(...action.roles)),
  on(actions.getRolDataError, (_state) => null),
  on(actions.clearRolData, (_state) => null)
);

export const rolesDataReducer = (state, action) =>
  _rolesDataReducer(state, action);
