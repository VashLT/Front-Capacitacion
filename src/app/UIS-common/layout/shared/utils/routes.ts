import { Route } from "@angular/router";
import { UisLayoutComponent } from "../../app-layout/uis-layout.component";
import { NotFoundErrorComponent } from "../components/not-found-error/not-found-error.component";

export const RoutesLayout: Route[] = [
  {
    path: "**",
    component: UisLayoutComponent,
    children: [
      {
        path: "not-found",
        component: NotFoundErrorComponent,
      },
      {
        path: "",
        component: NotFoundErrorComponent,
      },
    ],
  },
];
