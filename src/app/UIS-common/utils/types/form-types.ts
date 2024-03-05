import { AbstractControl } from '@angular/forms';

/**
 * Type para los valores raw de un formulario tipado.
 */
export type FormRawValue<T extends AbstractControl> = T extends AbstractControl<
  any,
  infer TRawValue
>
  ? TRawValue
  : never;
