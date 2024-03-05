import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdjuntosUrlDescargaDirective } from './adjuntos-url-descarga.directive';
import {
  FileChooserComponent,
  FileChooserModule,
} from '@uis/uis-lib/components/file-chooser';
import { NewTranslatePipe } from '@uis/uis-lib/pipes';

describe('AdjuntosUrlDescargaDirective', () => {
  let component: FileChooserComponent;
  let fixture: ComponentFixture<FileChooserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FileChooserModule, HttpClientTestingModule, MatDialogModule],
      providers: [NewTranslatePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileChooserComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    const directive = new AdjuntosUrlDescargaDirective(component);
    expect(directive).toBeTruthy();
  });
});
