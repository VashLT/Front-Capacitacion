import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { SetDefaultRoleComponent } from "./set-default-role.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatSelectTwoModule } from "@uis/uis-lib/components/mat-select-two";

const mockMatSnackBar = {
  open: () => {},
};

describe("SetDefaultRoleComponent", () => {
  let component: SetDefaultRoleComponent;
  let fixture: ComponentFixture<SetDefaultRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatSelectModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        MatSelectTwoModule,
        MatDialogModule,
      ],
      declarations: [SetDefaultRoleComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDefaultRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
