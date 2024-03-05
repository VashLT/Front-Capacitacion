export interface MenuChildrenItem {
  route: string;
  name: string;
  type: "link" | "sub" | "extLink" | "extTabLink" | "base";
  children?: MenuChildrenItem[];
  isConfig?: boolean;
}
