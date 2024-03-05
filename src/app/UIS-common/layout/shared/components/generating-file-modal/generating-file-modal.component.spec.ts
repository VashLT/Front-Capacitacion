import { TranslateModule } from "@ngx-translate/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GeneratingFileModalComponent } from "./generating-file-modal.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { LoaderModule } from "@uis/uis-lib/components/loader";

describe("GeneratingFileModalComponent", () => {
  let component: GeneratingFileModalComponent;
  let fixture: ComponentFixture<GeneratingFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratingFileModalComponent],
      imports: [TranslateModule.forRoot({}), LoaderModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratingFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
