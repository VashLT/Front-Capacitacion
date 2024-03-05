import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";

import { EditImageComponent } from "./edit-image.component";
import { ImageService } from "./services/image.service";
const mockMatSnackBar = {
  open: () => {},
};

describe("EditImageComponent", () => {
  let component: EditImageComponent;
  let fixture: ComponentFixture<EditImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot({}),
        MatMomentDateModule,
      ],
      declarations: [EditImageComponent],
      providers: [
        {
          provide: MatSnackBar,
          useValue: mockMatSnackBar,
        },
        ImageService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
