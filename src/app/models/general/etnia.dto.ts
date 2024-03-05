/**
 * Interface que define el contenido de una etnia.
 */
export interface Etnia {
  /**
   * Identificiador.
   */
  id: number;
  /**
   * Código de la etnia.
   */
  codigo: string;
  /**
   * Nombre de la etnia.
   */
  nombre: string;
  /**
   * Sigla de la etnia.
   */
  sigla: string;
  /**
   * Orden de la etnia.
   */
  orden: number;

  /**
   * Fecha desde vigencia registro.
   */
  fechaDesde: Date;
  /**
   * Fecha hasta vigencia registro.
   */
  fechaHasta: Date;
}
