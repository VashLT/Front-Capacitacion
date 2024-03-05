import { Directive } from "@angular/core";
import { FileChooserComponent } from "@uis/uis-lib/components/file-chooser";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";
import { b64toBlob } from "../../../../shared/utils/b64-to-blob";

/**
 * Directiva para cambiar el comportamiento del botón descargar del file chooser.
 */
@Directive({
  selector: "[appModifyFileChooserSign]",
})
export class ModifyFileChooserSignDirective {
  /**
   * Constructor de la directiva.
   *
   * @param component - Componente que contiene el file chooser.
   * @param snackbarService - Servicio para mostrar snackbars.
   */
  constructor(
    private component: FileChooserComponent,
    private snackbar: SnackbarService
  ) {
    if (component) {
      this.component.descargar = () => {
        try {
          const blob = b64toBlob(
            component.idAdjunto,
            component.idAdjunto.split(";")[0].split(":")[1]
          );
          const fileObjectURL = window.URL.createObjectURL(blob);
          window.open(fileObjectURL);
        } catch (error) {
          this.snackbar.showBackError(error);
        }
      };
    }
  }
}
