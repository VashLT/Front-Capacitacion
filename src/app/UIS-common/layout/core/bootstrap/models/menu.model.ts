import { MenuTag } from "./menu-tag.model";

export interface Menu {
  ID?: number;
  route: string;
  name: string;
  tag: string;
  type: "link" | "sub" | "extLink" | "extTabLink" | "base";
  icon: string;
  label?: MenuTag;
  badge?: MenuTag;
  children?: Menu[];
  [key: string]: any;
}
