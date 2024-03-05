import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";

import { NewTranslatePipe } from "@uis/uis-lib/pipes/newTranslate";
import { MatTabFullComponent } from "./mat-tab-full.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { CrudDialogModule } from "@uis/uis-lib/components/crud-dialog";
import { ConfirmModule } from "@uis/uis-lib/components/confirm";
import { MatSnackBarModule } from "@angular/material/snack-bar";

describe("MatTabFullComponent", () => {
  let component: MatTabFullComponent;
  let fixture: ComponentFixture<MatTabFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule,
        TranslateModule,
        MatSnackBarModule,
        ConfirmModule,
        CrudDialogModule,
        StoreModule.forRoot({}),
        TranslateModule.forRoot(),
      ],
      declarations: [MatTabFullComponent],
      providers: [NewTranslatePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTabFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
