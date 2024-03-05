export interface PersonaDocumentoDTO {
  id: number;
  idPersona: number;
  principal: boolean;
  idTipoDocumento: number;
  nombreTipoDocumento: string;
  numeroDocumento: string;
  fechaExpedicionDocumento: Date;
  idPaisExpedicionDocumento: number;
  idEstadoExpedicionDocumento: number;
  idCiudadExpedicionDocumento: number;
  nombreCiudadExpedicionDocumento: string;
  idDistritoLibretaMilitar: number;
  nombreDistritoLibretaMilitar: string;
  idClaseLibretaMilitar: number;
  nombreClaseLibretaMilitar: string;
  transaccionPosteriorConfirmada: boolean;
  idEstadoValidado: number;
  observacionesValidacion: string;
  nombreValidacion: string;
}
