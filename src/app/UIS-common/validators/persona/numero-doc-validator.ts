import {
  AbstractControl,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';
import { TipoDocumentoIdentidad } from '@models/general/tipo-documento-identidad.model';
import { TipoDocumentoIdentidadService } from '@services/general/tipo-documento-identidad/tipo-documento-identidad.service';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { inputPatterns } from 'src/app/recursos-humanos/hoja-vida/config/patterns.es.config';
import { datosPersonales } from 'src/app/recursos-humanos/hoja-vida/config/persona/datos-personales.es.config';

/**
 * Async validator para validar alfanuméricos o numéricos en el número de documento.
 *
 * @param controlNumeroDoc - Control del número de documento.
 * @param form - Formulario con todos los controles.
 * @param tipoDocumentoService - Servicio de tipos documentos.
 * @returns - Observable<ValidationErrors>
 */
export const numeroDocumentoValidator = (
  controlNumeroDoc: AbstractControl,
  form: UntypedFormGroup,
  tipoDocumentoService: TipoDocumentoIdentidadService,
  callback?: (respBack: {
    validation: string;
    originalData: TipoDocumentoIdentidad;
  }) => void,
  onlyNumbers = false
): Observable<ValidationErrors> => {
  const numeroDoc = controlNumeroDoc?.value;
  const idTipoDoc = form?.controls.idTipoDocumento.value;

  if (numeroDoc && idTipoDoc) {
    return tipoDocumentoService.getValidationsTipoDoc(idTipoDoc).pipe(
      switchMap((el) => validation(numeroDoc, onlyNumbers, el, callback)),
      catchError(() => validation(numeroDoc, onlyNumbers))
    );
  } else {
    return validation(numeroDoc, onlyNumbers);
  }
};

/**
 *  Función que valida con expresiones regulares.
 *
 * @param numeroDoc - Numero de documento.
 * @param respBack - Respuesta que me devuelve el backend al solicitar el tipo de validación.
 * @returns - Observable<null | {errorNumeroDoc}>
 */

const validation = (
  numeroDoc: string,
  onlyNumbers = false,
  respBack?,
  callback?: (respBack) => any
) => {
  if (callback) {
    callback(respBack);
  }
  const val = respBack?.validation ?? 'numeric';
  const valKey = onlyNumbers ? 'numeric' : val;
  return !regPatterns[valKey].test(numeroDoc)
    ? of({ errorNumeroDoc: valKey })
    : of(null);
};

/**
 * Expresiones regulares usadas por el validator.
 */
const regPatterns = {
  alphanumeric: new RegExp(
    datosPersonales.insertMode.validationPatternNumberField
  ),
  numeric: new RegExp(inputPatterns.validationOnlyNumbers),
};
