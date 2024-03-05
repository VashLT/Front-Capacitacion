import { MatSelectModule } from "@angular/material/select";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

import { EditProfileComponent } from "./edit-profile.component";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { provideMockStore } from "@ngrx/store/testing";
import { NewTranslatePipe } from "@uis/uis-lib/pipes/newTranslate";

const mockMatSnackBar = {
  open: () => {},
};

describe("EditProfileComponent", () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfileComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        HttpClientTestingModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatSelectModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MatSnackBar,
          useValue: mockMatSnackBar,
        },
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: {} },
        provideMockStore(),
        NewTranslatePipe,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
