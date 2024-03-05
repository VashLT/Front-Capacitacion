import { createAction, props } from "@ngrx/store";
import { UserData } from "./user-data.model";

export const getUserData = createAction("[User] Get Data");

/**
 * Los datos del usuario se consiguieron con exito
 */
export const getUserDataSuccess = createAction(
  "[User] Get Data Success",
  props<{ userData: UserData }>()
);

export const getUserDataError = createAction("[User] Get Data Error");

/**
 * Limpia el store 'user'
 */
export const clearUserData = createAction("[User] Clear Data");
