export interface PersonaDocumento {
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
  fechaVencimientoDocumento: Date;
  idClaseLibretaMilitar: number;
  nombreClaseLibretaMilitar: string;
  idDistritoLibretaMilitar: number;
  nombreDistritoLibretaMilitar: string;
}
