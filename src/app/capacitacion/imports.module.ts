import { CalculatorComponent } from './calculator/calculator.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { TareaComponent } from './lista-tareas/components/tarea/tarea.component';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { ObservablesComponent } from './observables/observables.component';
import { PortadaComponent } from './portada/portada.component';
import { IMaskModule } from 'angular-imask';

export const IMPORTS_CAPACITACION = {
  components: [PortadaComponent, CalculatorComponent, ObservablesComponent, ListaTareasComponent, TareaComponent, FormulariosComponent],
  modules: [IMaskModule],
};
