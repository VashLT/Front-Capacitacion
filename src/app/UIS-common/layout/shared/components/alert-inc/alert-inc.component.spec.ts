import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AlertIncComponent } from "./alert-inc.component";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";

describe("AlertIncComponent", () => {
  let component: AlertIncComponent;
  let fixture: ComponentFixture<AlertIncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatIconModule, TranslateModule.forRoot({})],
      declarations: [AlertIncComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertIncComponent);
    component = fixture.componentInstance;
    component.inconsistentData = {
      message: "example",
      success: true,
      icon: "priority_high",
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
