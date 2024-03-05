import { createReducer, on } from "@ngrx/store";
import { initialState } from "../layout-store.model";
import * as actions from "./user-data.actions";

const _userDataReducer = createReducer(
  initialState.user,
  on(actions.getUserData, (state) => state),
  on(actions.getUserDataSuccess, (_state, action) =>
    Object.assign({}, action.userData)
  ),
  on(actions.getUserDataError, (_state) => null),
  on(actions.clearUserData, (_state) => null)
);

export const userDataReducer = (state, action) =>
  _userDataReducer(state, action);
