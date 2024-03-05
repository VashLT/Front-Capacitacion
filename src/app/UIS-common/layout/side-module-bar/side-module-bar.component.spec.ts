import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SideModuleBarComponent } from "./side-module-bar.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { StoreModule } from "@ngrx/store";

describe("SideModuleBarComponent", () => {
  let component: SideModuleBarComponent;
  let fixture: ComponentFixture<SideModuleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideModuleBarComponent],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        StoreModule.forRoot({}),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SideModuleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
