import { CalculatorComponent } from './calculator/calculator.component';
import { PortadaComponent } from './portada/portada.component';
import { IMaskModule } from 'angular-imask';

export const IMPORTS_CAPACITACION = {
  components: [PortadaComponent, CalculatorComponent],
  modules: [IMaskModule],
};
