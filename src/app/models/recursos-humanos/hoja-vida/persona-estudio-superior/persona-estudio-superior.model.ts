export interface PersonaEstudio {
  id: number;
  idPersona: number;
  idInstitucionEducativa: number;
  idTituloAcademico: number;
  horasCursadas: number;
  certificacionEstudio: boolean;
  tarjetaProfesional: string;
  observacionesEstudio: string;
  tituloExtranjero: boolean;
  idPaisTitulo: number;
  fechaRegistro: Date;
  fechaCertificado: Date;
  validadoRH: boolean;
  adjunto: string;
}
