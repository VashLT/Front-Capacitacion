import { Component, Inject, Optional } from "@angular/core";
import { Subject } from "rxjs";
import { ConfigCompModel } from "./models/config-comp.model";
import { CONFIG_GENERATING_FILE_TOKEN } from "./tokens/config-component-token";

/**
 * Componente a mostrar cuando se está generando un archivo a descargar.
 */
@Component({
  selector: "app-generating-file-modal",
  templateUrl: "./generating-file-modal.component.html",
  styleUrls: ["./generating-file-modal.component.scss"],
})
export class GeneratingFileModalComponent {
  /**
   * Configuración del componente.
   */
  configComponent: ConfigCompModel;

  /**
   * Subject que permite cancelar la solicitud asociada.
   */
  canceller: Subject<boolean> | null = null;

  /**
   * Archivo a descargar.
   */
  file: File | null = null;

  /**
   * Callback luego de descargar el archivo.
   */
  callback = null;

  /**
   * Constructor del componente.
   *
   * @param config - Configuración del componente.
   */
  constructor(
    @Optional() @Inject(CONFIG_GENERATING_FILE_TOKEN) private config: any
  ) {
    if (!config) {
      this.configComponent = {
        onLoading: "GENERAL_PAGES_FROM_LAYOUT.GENERATING_FILES_COMP.ON_LOADING",
        onSuccess: "GENERAL_PAGES_FROM_LAYOUT.GENERATING_FILES_COMP.ON_SUCCESS",
        downloadTextButton: "BUTTONS_NAMES.DOWNLOAD_FILES",
        cancelTextButton: "BUTTONS_NAMES.CANCEL_BUTTON",
      };
    } else {
      this.configComponent = config;
    }
  }

  /**
   * Función para descargar el archivo.
   */
  downloadFile() {
    const url = window.URL.createObjectURL(this.file);
    const link = document.createElement("a");
    link.href = url;
    link.download = this.file.name;
    link.click();
    window.URL.revokeObjectURL(url);
    if (this.callback) {
      this.callback();
    }
  }

  /**
   * Función para cancelar la descarga del archivo.
   */
  cancelar() {
    if (this.callback) {
      this.callback();
    }
    this.canceller?.next(true);
  }
}
