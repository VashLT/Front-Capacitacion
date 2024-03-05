export interface PersonaEmbarazo {
  id: number;
  idPersona: number;
  fechaRegistro: Date;
  fechaPosibleParto: Date;
  fechaDesde: Date;
  observaciones: string;
  adjunto: string;
  idEstadoValidacion: number;
  nombreValidacion: string;
  nombrePersonaAndDocumentPersona: string;
}
