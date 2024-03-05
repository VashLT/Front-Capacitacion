import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
/**
 * Función para validar la relación de aspecto de una imagen en base64.
 *
 * @param aspectRadio - Aspect radio a validar.
 * @param tolError - Tolerancia de error.
 * @param isFile - Indica si el valor es un archivo y NO un base64.
 * @returns - AsyncValidatorFn
 */
export const validateAspectRadioImage = (
  aspectRadio: string = "1:1",
  tolError: number = 0.1,
  isFile?: boolean
): AsyncValidatorFn => {
  const radio = aspectRadio.split(":");
  const radioX = parseFloat(radio[0]);
  const radioY = parseFloat(radio[1]);
  const aspectValue = radioX / radioY;
  return async (
    control: AbstractControl
  ): Promise<{ aspectRadio: boolean } | null> =>
    new Promise((resolve, _) => {
      const imgb64 = control.value;
      if (imgb64) {
        const image = new Image();
        image.onload = () => {
          const aspect = image.width / image.height;
          const error = Math.abs(aspect - aspectValue);
          if (error > tolError) {
            resolve({ aspectRadio: true });
          } else {
            resolve(null);
          }
        };
        image.onerror = () => {
          resolve(null);
        };
        if (isFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            image.src = e.target.result as string;
          };
          reader.readAsDataURL(imgb64);
        } else {
          image.src = control.value;
        }
      } else {
        resolve(null);
      }
    });
};
