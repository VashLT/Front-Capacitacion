import { BuscadorPersonaListItemDTO } from './buscador-persona-list-item-dto';
export interface BuscadorPersonaDTO {
  numeroRegistros: number;
  personaList: BuscadorPersonaListItemDTO[];
}
