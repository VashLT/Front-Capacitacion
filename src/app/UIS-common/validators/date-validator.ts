import { AbstractControl, ValidatorFn } from '@angular/forms';

export const maxDatetoday = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const fechaSeleccionada = new Date(control.value);
    const fechaActual = new Date();
    return fechaSeleccionada > fechaActual
      ? { incorrect: 'La fecha seleccionada no puede ser mayor que la actual' }
      : null;
  };
};
