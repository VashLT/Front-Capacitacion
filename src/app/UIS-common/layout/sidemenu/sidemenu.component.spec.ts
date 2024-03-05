import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { UisLayoutModule } from "../uis-layout.module";

import { SidemenuComponent } from "./sidemenu.component";
import { MenuDataService } from "../store/menu/menu-data.service";
import { AuthService, TokenService } from "../core";
import { LocalStorageService } from "../shared";
import { ImageService } from "../header/components/edit-image/services/image.service";
import { ParametrosService } from "../shared/services/parametros/parametros.service";
import { ParametrosToLoadService } from "../shared/services/parametros/config/parametros-to-load.service";

describe("SidemenuComponent", () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidemenuComponent],
      imports: [
        StoreModule.forRoot({}),
        MatFormFieldModule,
        MatInputModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        UisLayoutModule,
        EffectsModule.forRoot([]),
        BrowserAnimationsModule,
      ],
      providers: [
        MenuDataService,
        AuthService,
        TokenService,
        LocalStorageService,
        ImageService,
        ParametrosService,
        ParametrosToLoadService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
