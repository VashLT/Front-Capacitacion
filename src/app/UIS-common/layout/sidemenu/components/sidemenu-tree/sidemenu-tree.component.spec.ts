import { MenuDataService } from "../../../store/menu/menu-data.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTreeModule } from "@angular/material/tree";
import { RouterTestingModule } from "@angular/router/testing";

import { SidemenuTreeComponent } from "./sidemenu-tree.component";

describe("SidemenuTreeComponent", () => {
  let component: SidemenuTreeComponent;
  let fixture: ComponentFixture<SidemenuTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidemenuTreeComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatTreeModule,
      ],
      providers: [MenuDataService],
    }).compileComponents();

    fixture = TestBed.createComponent(SidemenuTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
