/**
 * Interface que define una configuración del reporteador.
 */
export interface ReporteadorConfig {
  /**
   * Id de la configuración.
   */
  id?: number;

  /**
   * Id del usuario dueno de la configuración.
   */
  idUsuario?: number;

  /**
   * Sección sobre la cual está la configuración.
   */
  endPoint: string;

  /**
   * Id del rol del usuario actual.
   */
  idRol?: number;

  /**
   * Configuración de claves y orden.
   */
  configuracion: string;

  /**
   * Nombre de la configuración.
   */
  nombreConfiguracion: string;

  /**
   * Fecha en la que se creó la configuración.
   */
  fechaRegistro?: Date;
}
