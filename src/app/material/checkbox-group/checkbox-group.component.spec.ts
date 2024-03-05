import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxGroupComponent } from './checkbox-group.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('CheckboxGroupComponent', () => {
  let component: CheckboxGroupComponent;
  let fixture: ComponentFixture<CheckboxGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCheckboxModule],
      declarations: [CheckboxGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
