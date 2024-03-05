import { ItemClasificacion } from '@models/general/item-clasificacion.model';

export interface PersonaDiscapacidadDTO {
  idPersona: number;
  id: number;
  idEntidadCertifica: number;
  categoriasDiscapacidadJson: any; // array de ids de categorias de discapacidad
  clasificacionDominioJson: any; // array de ids de clasificacion de dominio
  idAdjunto: number;

  fechaRegistro: Date;
  fechaCertificado: Date;
  fechaHastaCertificado: Date;
  porcentajeGlobalDiscapacidad: number;
  observaciones: string;

  nombreEntidadCertifica: string;
  nombreClasificacionDominio: string;
  nombreAdjunto: string;
  nombreCategoriasDiscapacidad: string[];
  nombreOrigenLimitacion: string;

  restriccionOcupacion: boolean | number;
  ajusteLaboral: boolean | number;

  categoriasDiscapacidad: ItemClasificacion[];
  clasificacionDominio: ItemClasificacion[];

  nombrePersonaAndDocumentPersona: string;
}
