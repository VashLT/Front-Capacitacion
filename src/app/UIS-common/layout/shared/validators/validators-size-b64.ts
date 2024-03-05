import { AbstractControl } from "@angular/forms";
import { urlToFile } from "../utils/url-to-file";

/**
 * Función para validar el tamano de un archivo que viene en b64.
 *
 * @param maxSizeInBytes - Tamaño máximo del archivo en bytes
 * @returns - Promise<{maxSize: {
      invalid: boolean;
      maxSizeRequired: string;
    } | null}>
 */
export const validatorMaxFileSizeB64 = (maxSizeInBytes: number) => {
  return async (
    control: AbstractControl
  ): Promise<{
    maxSize: {
      invalid: boolean;
      maxSizeRequired: string;
    };
  } | null> => {
    if (control.value) {
      const file = await urlToFile(control.value as string);
      if (file.size > maxSizeInBytes) {
        return {
          maxSize: {
            invalid: true,
            maxSizeRequired: maxSizeInBytes / 1000 / 1000 + "MB",
          },
        };
      }
    }
    return null;
  };
};
