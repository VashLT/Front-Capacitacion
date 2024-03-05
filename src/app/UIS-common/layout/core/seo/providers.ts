import { APP_INITIALIZER, Provider } from "@angular/core";
import { RouteChangesService } from "../network-status/route-changes/route-changes.service";
import { SeoService } from "./seo.service";

export const LAYOUT_SEO_PROVIDERS: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: (seo: SeoService, routeChanges: RouteChangesService) => {
      return () => {
        seo.init();
        routeChanges.init();
      };
    },
    multi: true,
    deps: [SeoService, RouteChangesService],
  },
];
