import { createReducer, on } from "@ngrx/store";
import { initialState } from "../layout-store.model";
import * as actions from "./menu-data.actions";

const _menuDataReducer = createReducer(
  initialState.currentNavigation,
  on(actions.loadMenus, (state) => {
    return state;
  }),
  on(actions.loadMenusSuccess, (_state, action) => {
    return {
      rolMenus: action.rolMenus,
      userMenus: action.userMenus,
      slug: action.slug,
      rightTopMenus: action.rightTopMenus,
    };
  }),
  on(actions.loadMenusError, (_) => null),
  on(actions.clearMenusData, (_) => null)
);
export const menuDataReducer = (state, action) =>
  _menuDataReducer(state, action);
