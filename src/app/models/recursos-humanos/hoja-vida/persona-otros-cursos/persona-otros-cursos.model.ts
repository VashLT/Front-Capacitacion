export interface PersonaOtrosCursos {
  id: number;
  idPersona: number;
  idEstudio: number;
  idInstitucionEducativa: number;
  idTipoDeCertificado: number;
  fechaDeFinalizacion: Date;
  horasCursadas: number;
  observaciones: string;
  isInformacionValidadaRH: boolean;
  idAdjunto: string;
}
