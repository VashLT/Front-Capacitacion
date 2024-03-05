import { DetalleClasificacion } from './detalle-clasificacion.model';

/**
 * Tipado para los documentos de identidad.
 */
export type TipoDocumentoIdentidad = DetalleClasificacion & {
  /**
   * Específicamente todos los documentos de identidad tienen ahora el campo abreviatura en lugar de sigla.
   */
  abreviatura?: string;

  /**
   * Señal de si el campo es numérico o no.
   */
  senalNumerico?: number;

  /**
   * Señal de si el tipo de documento tiene dígito de verificación o no.
   */
  senalDigitoVerificacion?: number;

  /**
   * Señal de si el tipo de documento requiere fecha de vencimiento o no.
   */
  senalVencimiento?: number;

  /**
   * Señal de si el tipo de documento requiere fecha de expedición o no.
   */
  senalFechaExpedicion?: number;

  /**
   * Señal de si el tipo de documento requiere ciudad de expedición o no.
   */
  senalCiudadExpedicion?: number;
};
