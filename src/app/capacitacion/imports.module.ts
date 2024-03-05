import { PortadaComponent } from './portada/portada.component';
import { TestComponent } from './test/test.component';
import { IMaskModule } from 'angular-imask';

export const IMPORTS_CAPACITACION = {
  components: [PortadaComponent, TestComponent],
  modules: [IMaskModule],
};
