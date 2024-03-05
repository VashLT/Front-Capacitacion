import { APP_INITIALIZER } from "@angular/core";
import { lastValueFrom, of, take } from "rxjs";

import { StartupService } from "./bootstrap/startup.service";
import { ConfirmUpdateService } from "./service-workers/updating-app/services/confirm-update-version-app/confirm-update.service";

export const APP_INITIALIZER_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: (startup: StartupService) => {
      return () => {
        return lastValueFrom(of(startup.load()).pipe(take(1)));
      };
    },
    deps: [StartupService],
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: (updateServiceWorker: ConfirmUpdateService) => {
      return () => updateServiceWorker.checkForUpdates();
    },
    deps: [ConfirmUpdateService],
    multi: true,
  },
];
