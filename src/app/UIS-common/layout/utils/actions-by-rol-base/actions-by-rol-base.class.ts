import { RolActionsService } from "../../core/authentication/rol-actions/rol-actions.service";
import { Observable, tap } from "rxjs";

/**
 * Clase base para el tratamiento de las acciones por rol.
 */
export class ActionsByRolBase {
  /**
   * Acciones del rol actual.
   */
  actionsRol$: Observable<{ [key: string]: boolean }>;

  /**
   * Slug de la sección.
   */
  slugSection = "";

  /**
   * Valor de las acciones del rol.
   */
  actionsRol;

  /**
   * Constructor de la clase.
   *
   * @param rolActionsService - Servicio de acciones por rol.
   */
  constructor(public rolActionsService: RolActionsService) {}

  /**
   * Función para obtener las acciones del rol actual para esta sección.
   */
  getActionsSection() {
    this.actionsRol$ = this.rolActionsService
      .getActionsBySection(this.slugSection)
      .pipe(
        tap((actions) => {
          this.actionsRol = actions;
        })
      );
  }
}
