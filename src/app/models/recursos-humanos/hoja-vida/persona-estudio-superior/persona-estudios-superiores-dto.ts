export interface PersonaEstudioSuperiorDTO {
  id: number;
  idPersona: number;
  idModalidadFormacion: number;
  nombreModalidadFormacion: string;
  idTituloAcademico: number;
  nombreTituloAcademico: string;
  idInstitucionEducativa: number;
  nombreInstitucionEducativa: string;
  fechaTitulo: Date;
  numeroTarjetaProfesional: string; //Por si lleva otras cosas y no solo numeros
  fechaExpedicionTarjetaProfesional: Date;
  duracion: number;
  tipoDuracion: string; //semestres, años
  observaciones: string;
  isTituloExtranjero: boolean;
  fechaConvalidacion: Date;
  numeroResolucion: string; //Por si lleva otras cosas y no solo numeros
  idPaisTitulo: number;
  nombrePaisTitulo: string;
  isInformacionValidadaRH: boolean;
  idAdjunto: string;
  rowNumber: number;
  isFromInformix: boolean;
  changedAdjuntoTitulo: boolean;
  changedTarjetaProfesional: boolean;
}
