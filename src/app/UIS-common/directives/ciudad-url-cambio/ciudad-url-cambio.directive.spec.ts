import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CiudadUrlCambioDirective } from './ciudad-url-cambio.directive';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  CiudadChooserModule,
  CiudadChooserComponent,
} from '@uis/uis-lib/components/ciudad-chooser';
describe('CiudadUrlCambioDirective', () => {
  let component: CiudadChooserComponent;
  let fixture: ComponentFixture<CiudadChooserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CiudadChooserModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadChooserComponent);
    component = fixture.componentInstance;
  });
  it('should create an instance', () => {
    const directive = new CiudadUrlCambioDirective(component);
    expect(directive).toBeTruthy();
  });
});
