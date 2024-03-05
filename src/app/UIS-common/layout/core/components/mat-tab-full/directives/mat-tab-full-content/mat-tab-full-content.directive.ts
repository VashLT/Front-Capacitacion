import { Directive, Input, TemplateRef } from "@angular/core";

/**
 * directiva del componente @see MatTabFullComponent,
 * se utiliza para crear las tab y el contenido de la misma.
 * @since 1.0
 * @example
 * ```html
 * <ng-template tabFullContent label="label of tab">
 *   aqui va el contenido
 * </ng-template>
 * ```
 */
@Directive({
  selector: "[tabFullContent]",
})
export class MatTabFullContentDirective {
  /**
   * nombre de la tab.
   */
  @Input()
  label: string;

  /**
   * icono de material angular, ubicado a la izquierda del label de la tab.
   */
  @Input()
  icon: string;

  /**
   * desactiva el tab.
   */
  @Input()
  disabled: boolean;

  constructor(public template: TemplateRef<any>) {}
}
