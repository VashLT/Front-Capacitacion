export interface Loseta {
  ID: Number;
  ICONO: string;
  ID_PADRE: number | null;
  NOMBRE: string;
  TAG: string;
  ORDEN: number;
  ID_ROL: number | null;
  ID_USUARIO: number | null;
  RUTA: string;
  ACTIVO: boolean;
  MODULO_DIRECTO: boolean;
  RIGHT_TOP_MENU: boolean;
  CREADO: string;
  MODIFICADO: string;
  RESTRINGIR?: boolean;
  HIJOS?: Loseta[];
}
