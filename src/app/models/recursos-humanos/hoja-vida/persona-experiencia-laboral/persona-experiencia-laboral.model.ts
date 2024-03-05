export interface PersonaExperienciaLaboral {
  id: number;
  idPersona: number;
  idTipoCapitalEmpresa: number;
  idCiudadExperiencia: number;
  idTipoDedicacion: number;
  idCausaRetiro: number;
  idTipoExperiencia: number;

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
}
