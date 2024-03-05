export interface InstitucionEducativaDTO {
  id: number;
  nombreInstitucionEducativa: string;
  idCiudad: number;
  nombreCiudad: string;
  direccionInstitucionEducativa: string;
  telefonoInstitucionEducativa: string;
  correoElectronicoInstitucionEducativa: string;
  idClaseInstitucion: number;
  nombreClaseInstitucion: string;
  nombreDirector: string;
  observaciones: string;
  codigoIcfesColegio: number;
  senalIndicativoParUIS: number;
  idTipoInstitucionEducativa: number;
  nombreTipoInstitucionEducativa: string;
  siglaTipoInstitucionEducativa: string;
  ubicacion: string;
}

export interface ConsultaInstitucion {
  id: number;
  idTipoInstitucion: number;
  idCiudad: number;
}
