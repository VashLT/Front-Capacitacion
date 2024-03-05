import { Parametros } from "./parametros/parametros.model";
import { Menu } from "../core/bootstrap/models/menu.model";
import { UserData } from "../store/user/user-data.model";
import { RightTopMenuParent } from "./menu/menu-data.model";
import { PersonData } from "./person/person-data.model";
import { RolData } from "./roles/roles-data.model";

export interface LayoutState {
  currentNavigation: {
    rolMenus: Menu[];
    userMenus: Menu[];
    rightTopMenus: RightTopMenuParent[];
    slug: string;
  };
  user: UserData;
  roles: RolData[];
  person: PersonData;
  parametros: Parametros;
}

export const initialState = {
  currentNavigation: null,
  user: undefined,
  roles: null,
  person: null,
  parametros: null,
};
