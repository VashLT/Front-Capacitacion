export interface RawMenuModel {
  ID: number;
  ID_PADRE: number | null;
  NOMBRE: string;
  ORDEN: number | null;
  ID_ROL: number;
  ID_USUARIO: number | null;
  RUTA: string;
  ACTIVO: boolean;
  RIGHT_TOP_MENU: boolean;
  MODULO_DIRECTO: boolean;
  MODIFICADO: string;
  CREADO: string;
  ID_MENU_CRUZADO: number | null;
  /**
   * deberia ser tipo RawMenuModel[], pero
   * da errores de tipado debido a la recursividad
   */
  HIJOS: RawMenuModel[];
  ICONO?: string;
}

export interface CurrentNavigation {
  ID_ROL: number;
  ID_USUARIO: number | null;
  SIDE_MENU: RawMenuModel[];
  USER_MENU: RawMenuModel[];
  RIGHT_TOP_MENU: RawMenuModel[];
  SLUG: string;
  [key: string]: any;
}

export interface RightTopMenu {
  ID: number;
  ID_PADRE: number | null;
  NOMBRE: string;
  ORDEN: number | null;
  RUTA: string;
  ACTIVO: boolean;
  RIGHT_TOP_MENU: boolean;
  MODULO_DIRECTO: boolean;
  MODIFICADO: string;
  CREADO: string;
  ICONO?: string;
  DESCRIPCION?: string;
}

export type RightTopMenuParent = RightTopMenu & {
  HIJOS: RightTopMenu[];
};
