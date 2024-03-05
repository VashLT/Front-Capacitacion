import { Component } from "@angular/core";
import { img404 } from "../config/img-404";

/**
 * Componente de página de error 404.
 */
@Component({
  selector: "app-not-found-error",
  templateUrl: "./not-found-error.component.html",
  styleUrls: ["./not-found-error.component.scss"],
})
export class NotFoundErrorComponent {
  /**
   * Imagen de error 404.
   */
  public readonly img = img404;
}
