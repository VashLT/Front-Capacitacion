export interface Menu {
  id: number;
  nombre: string;
  link: string;
  tag: string;
  icono: string;
  ruta: string;
  rightTopMenu: boolean;
  checked?: boolean;
  expanded?: boolean;
  allChecked?: boolean;
  hijos?: Menu[];
  topMenus?: Menu[];
}

export interface UpdateObject {
  idModulo: number;
  apps: number[];
}

export interface Module {
  id: number;
  nombre: string;
  link: string;
  tag: string;
  icono: string;
  ruta: string;
  topMenus?: Menu[];
  hijos?: Menu[];
  expanded?: boolean;
  allChecked?: boolean;
}
