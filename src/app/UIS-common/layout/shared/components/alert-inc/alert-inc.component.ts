import { Component, Input } from "@angular/core";
import { InconsistentData } from "./models/inconsistent-data.model";

/**
 * Componente para mostrar alerta.
 */
@Component({
  selector: "app-alert-inc",
  templateUrl: "./alert-inc.component.html",
  styleUrls: ["./alert-inc.component.scss"],
})
export class AlertIncComponent {
  /**
   * Incosistencia.
   */
  @Input() inconsistentData: InconsistentData;
}
