import { TranslateModule } from "@ngx-translate/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfirmContentUpdateComponent } from "./confirm-content-update.component";

describe("ConfirmContentUpdateComponent", () => {
  let component: ConfirmContentUpdateComponent;
  let fixture: ComponentFixture<ConfirmContentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({})],
      declarations: [ConfirmContentUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmContentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
