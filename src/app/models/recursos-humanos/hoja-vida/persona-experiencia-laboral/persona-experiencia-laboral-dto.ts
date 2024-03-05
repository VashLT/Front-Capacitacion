export interface PersonaExperienciaLaboralDTO {
  id: number;
  idPersona: number;
  idTipoCapitalEmpresa: number;
  nombreTipoCapitalEmpresa: string;
  idCiudadExperiencia: number;
  nombreCiudadExperiencia: string;
  idTipoDedicacion: number;
  nombreTipoDedicacion: string;
  idCausaRetiro: number;
  nombreCausaRetiro: string;
  idTipoExperiencia: number;
  nombreTipoExperiencia: string;

  nombreEmpresa: string;
  direccionEmpresa: string;
  telefonoEmpresa: string;
  fechaIngresoEmpresa: Date;
  fechaRetiroEmpresa: Date;
  agnosServicio: number;
  mesesServicio: number;
  diasServicio: number;
  dependencia: string;
  cargo: string;
  rowNumber: number;
  isOPS: boolean;
}
