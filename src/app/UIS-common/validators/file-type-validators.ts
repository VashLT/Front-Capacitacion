import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Validator para tipos de archivos.
 *
 * @param fileTypesAllowed - Tipos de archivos permitidos.
 * @description - A partir de un array de tipos de archivos permitidos se valida si
 * el tipo del archivo seleccionado está en ese array.
 *
 * @returns - ValidatorFn
 */
export const fileType = (fileTypesAllowed: string[]): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const conditionOnValueFile = control.value
      ? { fileType: 'Formato de archivo inválido.' }
      : null;
    return fileTypesAllowed?.includes((control.value as File)?.type)
      ? null
      : conditionOnValueFile;
  };
};
