import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Validator para fechas.
 *
 * @param date - Fecha contra la cual se validará.
 * @param type - Tipo de validación a realizar.
 * @returns - ValidatorFn
 */
export const dateValidator = (
  date: Date,
  type: '>' | '<' | '>=' | '<='
): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const fechaSeleccionada = new Date(control.value);
    date.setHours(0, 0, 0, 0);
    switch (type) {
      case '>':
        return fechaSeleccionada > date ? null : { dateIncorrect: true };
      case '<':
        return fechaSeleccionada < date ? null : { dateIncorrect: true };
      case '>=':
        return fechaSeleccionada >= date ? null : { dateIncorrect: true };
      case '<=':
        return fechaSeleccionada <= date ? null : { dateIncorrect: true };
      default:
        return null;
    }
  };
};
