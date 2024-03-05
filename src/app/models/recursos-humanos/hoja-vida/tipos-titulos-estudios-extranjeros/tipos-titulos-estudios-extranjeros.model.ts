/**
 * Interface que define los tipos de títulos extranjeros.
 */
export interface TipoTituloExtranjero {
  /**
   * Id del tipo de título extranjero.
   */
  id: number;

  /**
   * Nombre del tipo de título extranjero.
   */
  nombre: string;

  /**
   * Senal de si el adjunto es requerido.
   */
  senalAdjunto: senalesTitulosExtranjeros;

  /**
   * Senal de si la fecha convalidación es requerida.
   */
  senalFechaConvalidacion: senalesTitulosExtranjeros;

  /**
   * Senal de si el numero de resolución es requerido.
   */
  senalNroResolucion: senalesTitulosExtranjeros;

  /**
   * Senal de si el país del titulo es requerido.
   */
  senalPaisTitulo: senalesTitulosExtranjeros;
}

/**
 * 0: No se solicita ni se requiere.
 * 1: Se solicita pero n se requiere.
 * 2: Se solicita y se requiere.
 */
type senalesTitulosExtranjeros = 0 | 1 | 2;
