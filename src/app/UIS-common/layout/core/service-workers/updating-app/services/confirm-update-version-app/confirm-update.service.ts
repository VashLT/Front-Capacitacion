import { TranslateService } from "@ngx-translate/core";
import { startWith } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { interval } from "rxjs";
import { ConfirmContentUpdateComponent } from "../../components/confirm-content-update/confirm-content-update.component";
import { CrudService } from "@uis/uis-lib/services/crud";

/**
 * Servicio para manejar las actualizaciones de versión de aplicación.
 * Se hace uso de un service worker.
 */
@Injectable()
export class ConfirmUpdateService {
  /**
   * Constructor del servicio.
   *
   * @param swUpdate - Service worker encargado de actualizaciones.
   * @param crudService - Servicio de CRUD.
   * @param translate - Servicio de traducción.
   */
  constructor(
    private swUpdate: SwUpdate,
    private crudService: CrudService,
    private translate: TranslateService
  ) {
    swUpdate.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case "VERSION_READY":
          console.log("New version found after cache load");
          this.showModalOnNewVersion(true);
          break;
      }
    });
  }

  /**
   * Función que checkea si hay nuevas actualizaciones a través del service worker cada 20 minutos.
   */
  checkForUpdates() {
    const interval$ = interval(1 * 20 * 60 * 1000).pipe(startWith(0));
    interval$.subscribe(async () => {
      console.log("Checking for updates each 20 minutes...");
      try {
        const updateFound = await this.swUpdate.checkForUpdate();
        console.log(
          updateFound
            ? "A new version is available."
            : "Already on the latest version."
        );
        this.showModalOnNewVersion(updateFound);
      } catch (error) {
        console.error("Failed to check for updates:", error);
      }
    });
  }

  /**
   * Función que muestra un modal si hay una nueva versión de la aplicación.
   *
   * @param updateFound - Si se encuentra una nueva versión.
   */
  showModalOnNewVersion(updateFound: boolean) {
    let opened = false;
    for (const ref of this.crudService.referencias) {
      if (
        ref[0].componentInstance?.componentRef?.instance instanceof
        ConfirmContentUpdateComponent
      ) {
        opened = true;
      }
    }
    if (updateFound && !opened) {
      this.crudService
        .show({
          title: this.translate.stream(
            "GENERAL_PAGES_FROM_LAYOUT.GENERAL_MESSAGES.SYSTEM_INF"
          ),
          component: ConfirmContentUpdateComponent,
          hideCloseButtonInTopBar: true,
          dataComponent: {
            viewMode: true,
          },
          actions: {
            otherButtons: [
              {
                nombre: this.translate.stream("BUTTONS_NAMES.UPDATE"),
                action: () => {
                  document.location.reload();
                },
                type: "primary",
              },
            ],
          },
        })
        .subscribe();
    }
  }
}
