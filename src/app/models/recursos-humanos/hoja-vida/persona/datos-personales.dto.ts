export interface DatosPersonalesDTO {
  idPersona: number;
  codigoPostal: string;
  correoInstitucional: string;
  correoPersonal: string;
  direccionResidencia: string;
  direccionVisual?: string;
  dominioCorreoInstitucional: string;
  fechaExpedicionDocumento: string;
  fechaNacimiento: string;
  fechaVencimientoDocumento: string;
  idCiudadExpedicionDocumento: number;
  idCiudadNacimiento: number;
  idCiudadResidencia: number;
  idEstadoCivil: number;
  idEstadoExpedicionDocumento: number;
  idEstadoNacimiento: number;
  idEstadoResidencia: number;
  idFactorRH: number;
  idGenero: number;
  idGrupoSanguineo: number;
  idPaisExpedicionDocumento: number;
  idPaisNacimiento: number;
  idPaisResidencia: number;
  idTipoDocumento: number;
  tipoDocumento?: string;
  loginCorreoInstitucional: string;
  numeroDocumento: string;
  primerApellido: string;
  primerNombre: string;
  segundoApellido: string;
  segundoNombre: string;
  telefono: string;
  telefonoCelular: string;
  telefonoCelularAdicional: string;
  nombreBarrioResidencia: string;
  idFotoUsuario: number;
  claveFormulario: string;
  /**
   * Id del primer familiar encontrado de la cual la persona es familiar.
   */
  idFamiliar?: number;

  /**
   * Indica si ya está registrado como persona.
   */
  isPerson?: boolean;
  /**
   * Nombre del primer familiar encontrado de la cual la persona es familiar.
   */
  nombreFamiliar?: string;
  /**
   * Fecha hasta la cual fue familiar.
   */
  fechaCierreVigencia?: Date;

  /**
   * Clave que indica si una persona está activa en la tabla de familiares de alguien.
   */
  isFamiliar?: boolean;

  /**
   * Clave que indica si una persona fue familiar de alguien y además no tiene vigencias activas en tablas de familiares de nadie.
   */
  wasFamiliar?: boolean;

  /**
   * Clave que indica si una persona está registrada en la tabla de talento humano.
   */
  isFuncionario?: boolean;

  /**
   * Clave que indica si una persona está registrada con un documento de migración.
   */
  isMigracionCarnet?: boolean;

  /**
   * Clave que indica si una persona está registrada con un documento similar, muy común en PEP.
   */
  isDocumentSimilar?: boolean;

  /**
   * Nombre completo de la persona.
   */
  nombreCompleto?: string;
}
