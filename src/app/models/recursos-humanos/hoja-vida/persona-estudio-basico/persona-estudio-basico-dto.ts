export interface PersonaEstudioBasicoDTO {
  id: number;
  idPersona: number;
  idInstitucionEducativa: number;
  nombreInstitucionEducativa: string; //colegio...
  idTituloAcademico: number;
  nombreTituloAcademico: string; //bachiller...
  ultimoGradoAprobado: number;
  observaciones: string;
  fechaTitulo: Date; //fecha de grado
  isInformacionValidadaRH: boolean;
  idAdjunto: string;
  idTipoEstudio?: number;
}
