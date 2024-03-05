import { RouterTestingModule } from "@angular/router/testing";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule } from "@angular/forms";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MenuItemComponent } from "./menu-item.component";

describe("MenuItemComponent", () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule, FormsModule, RouterTestingModule],
      declarations: [MenuItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
