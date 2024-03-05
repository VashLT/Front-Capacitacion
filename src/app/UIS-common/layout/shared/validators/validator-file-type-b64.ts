import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * Función para validar extensiones un archivo que viene en b64.
 *
 * @param allowedExtensions - Extensiones permitidas (en el formato de accept: image/*, image/png, image/jpeg)
 * @returns - { fileType: boolean } | null
 */
export const validatorFileTypeB64 = (
  allowedExtensions: string[]
): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value) {
      const accept = value.split(";")[0].split(":")[1];
      allowedExtensions = allowedExtensions.map((ext) => ext.replace("*", ""));
      if (!allowedExtensions.find((ext) => accept?.includes(ext))) {
        return { fileType: true };
      }
    }
    return null;
  };
};
