import { createAction, props } from "@ngrx/store";
import { RolData } from "./roles-data.model";

export const getRolData = createAction("[Rol] Get Data");

export const getRolDataSuccess = createAction(
  "[Rol] Get Data Success",
  props<{ roles: RolData[] }>()
);

export const getRolDataError = createAction("[Rol] Get Data Error");

export const clearRolData = createAction("[Rol] Clear Data");
