export interface PersonaSubsidioFamiliar {
  id: number;
  idPersonaFamiliar: number;
  nombrePersonaAndDocument: string;
  fechaRegistro: Date;
  fechaDesde: Date;
  fechaHasta: Date;
  idTipoSubsidio: number;
  idAdjunto: number;
  fechaAdjunto: Date;
  nombreTipoSubsidio: string;
  nombrePersonaAndDocumentPersona: string;
}
