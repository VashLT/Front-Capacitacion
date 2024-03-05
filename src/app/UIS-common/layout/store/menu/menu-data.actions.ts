import { createAction, props } from "@ngrx/store";
import { Menu } from "../../core/bootstrap/models/menu.model";
import { RightTopMenu } from "./menu-data.model";

/**
 * Accion cuando se carga inicialmente los menus desde el backend (anteriormente currentNavigation
 * en localStorage). Llama al efecto menuDataEffect
 */
export const loadMenus = createAction("[menu] load", props<{ slug: string }>());

/**
 * Accion cuando los menus han sido cargados exitosamente
 * en localStorage)
 */
export const loadMenusSuccess = createAction(
  "[menu] load success",
  props<{
    rolMenus: Menu[];
    userMenus: Menu[];
    rightTopMenus: RightTopMenu[];
    slug: string;
  }>()
);

/**
 * Accion cuando ocurre un error al obtener los menus desde el backend
 */
export const loadMenusError = createAction("[menu] load error");

/**
 * Acción para limpiar los datos de los menus
 */
export const clearMenusData = createAction("[menu] Clear data");
