import { Idioma } from '../../../general/idioma.model';
import { CompetenciaIdioma } from '../../../general/competencia-idioma.model';

export interface PersonaIdiomaDTO {
  idPersona: number;
  id: number;
  idioma: Idioma;
  idIdioma: number;
  idCompetenciaIdiomaHabla: number;
  idCompetenciaIdiomaLee: number;
  idCompetenciaIdiomaEscribe: number;
  competenciaHabla: CompetenciaIdioma;
  competenciaLectura: CompetenciaIdioma;
  competenciaEscritura: CompetenciaIdioma;
  idNivel: number;
  certificacionIdioma: boolean;
  adjunto: string;
  observacionesIdioma: string;
  observaciones: string;
  idAdjunto: number;
}
