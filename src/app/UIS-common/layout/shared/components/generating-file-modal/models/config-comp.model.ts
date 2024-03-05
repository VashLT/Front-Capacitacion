/**
 * Interface para configurar el componente de generación de archivos.
 */
export interface ConfigCompModel {
  /**
   * Texto que se muestra mientras se genera el archivo.
   */
  onLoading: string;

  /**
   * Texto que se muestra cuando se genera el archivo.
   */
  onSuccess: string;

  /**
   * Texto del botón para descargar el archivo.
   */
  downloadTextButton: string;

  /**
   * Texto del botón para cancelar la generación del archivo.
   */
  cancelTextButton: string;
}
