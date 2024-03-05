/**
 * Interface que define un objeto de data inconsitente.
 */
export interface InconsistentData {
  /**
   * Mensaje de la inconsistencia.
   */
  message: string;

  /**
   * Indica si la inconsistencia es de tipo warning.
   */
  warning?: boolean;

  /**
   * Indica si la inconsistencia es de tipo error.
   */
  error?: boolean;

  /**
   * Indica si el mensaje a mostrar es success.
   */
  success?: boolean;

  /**
   * Icono a mostrar en el mensaje.
   */
  icon?: string;
}
