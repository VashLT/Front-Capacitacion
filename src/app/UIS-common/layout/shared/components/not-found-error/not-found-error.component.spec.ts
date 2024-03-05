import { SafeUrlPipe } from "./../../pipes/safe-url.pipe";
import { MatCardModule } from "@angular/material/card";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NotFoundErrorComponent } from "./not-found-error.component";
import { SharedModule } from "../../shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { NavigationService } from "../../services/navigation/navigation.service";

describe("NotFoundErrorComponent", () => {
  let component: NotFoundErrorComponent;
  let fixture: ComponentFixture<NotFoundErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        SharedModule,
        RouterTestingModule,
        MatCardModule,
      ],
      declarations: [NotFoundErrorComponent, SafeUrlPipe],
      providers: [NavigationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
