export interface PersonaEstudioDTO {
  id: number;
  idPersona: number;
  idInstitucionEducativa: number;
  nombreInstitucionEducativa: string;
  idNivelAcademico: number;
  nombreNivelAcademico: string;
  idTituloAcademico: number;
  nombreTituloAcademico: string;
  horasCursadas: number;
  certificacionEstudio: boolean;
  tarjetaProfesional: string;
  observacionesEstudio: string;
  tituloExtranjero: boolean;
  idPaisTitulo: number;
  nombrePaisTitulo: string;
  fechaRegistro: Date;
  fechaCertificado: Date;
  validadoRH: boolean;
  adjunto: string;
}
