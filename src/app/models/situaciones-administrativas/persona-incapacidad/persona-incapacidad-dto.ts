export interface PersonaIncapacidadDTO {
  id: string;
  idPersona: string;
  nombrePersonaAndDocumentPersona: string;
  idClaseIncapacidad: string;
  nombreClaseIncapacidad: string;
  codigoCIE: string;
  nombreDiagnosticoCIE: string;
  isProrroga: boolean;
  idVinculacion: string;
  idProrroga: string;
  fechaRegistro: Date;
  numeroCertificado: string;
  fechaInicioIncapacidad: Date;
  numeroDiasIncapacidad: number;
  fechaFinIncapacidad: Date;
  fechaReintegro: Date;
  observaciones: string;
  idAdjunto: string;
}
