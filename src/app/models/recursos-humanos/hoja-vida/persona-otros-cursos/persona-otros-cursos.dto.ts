export interface PersonaOtrosCursosDTO {
  id: number;
  idPersona: number;
  idEstudio: number;
  estudio: string;
  nombreEstudio: string;
  idInstitucionEducativa: number;
  nombreInstitucionEducativa: string;
  idTipoCertificado: number;
  nombreTipoCertificado: string;
  fechaDeFinalizacion: Date;
  horasCursadas: number;
  observaciones: string;
  isInformacionvalidadaRH: boolean;
  idAdjunto: number;
}
