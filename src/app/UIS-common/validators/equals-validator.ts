import { ValidatorFn, AbstractControl } from '@angular/forms';

const equalsValidator = (otherControl: AbstractControl): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } => {
    const value: any = control.value;
    const otherValue: any = otherControl.value;
    return otherValue === value ? null : { notEquals: { value, otherValue } };
  };
};

export const compararIgualdad = {
  equals: equalsValidator,
};
