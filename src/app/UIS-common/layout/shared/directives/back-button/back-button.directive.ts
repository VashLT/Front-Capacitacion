import { Directive, HostListener } from "@angular/core";
import { NavigationService } from "../../services/navigation/navigation.service";

/**
 * Directiva para volver en la navegación.
 */
@Directive({
  selector: "[appBackButton]",
})
export class BackButtonDirective {
  /**
   * Constructor de la directiva.
   *
   * @param navigation - NevigationService
   */
  constructor(private navigation: NavigationService) {}

  /**
   * Listener del click
   */
  @HostListener("click")
  onClick(): void {
    this.navigation.back();
  }
}
