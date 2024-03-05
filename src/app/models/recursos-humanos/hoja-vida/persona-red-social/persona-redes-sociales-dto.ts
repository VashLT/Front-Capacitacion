import { ItemClasificacion } from '../../../general/item-clasificacion.model';

export interface PersonaRedSocialDTO {
  idPersona: number;
  id: number;
  fechaRegistro: Date;
  idRedSocial: number;
  redSocial: ItemClasificacion;
  enlace: string;
}
