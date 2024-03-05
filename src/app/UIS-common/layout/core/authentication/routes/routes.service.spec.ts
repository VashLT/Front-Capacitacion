import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RoutesService } from "./routes.service";
import { provideMockStore } from "@ngrx/store/testing";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProvideDefaultsRoutesService } from "./provide-defaults-routes.service";
import { MenuService } from "../../bootstrap/menu.service";
import { MenuStoreLoaderService } from "../../bootstrap/menu-store-loader.service";
import { MenuDataService } from "../../../store/menu/menu-data.service";
const mockMatSnackBar = {
  open: () => {},
};

describe("RoutesService", () => {
  let service: RoutesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        RoutesService,
        MenuService,
        provideMockStore(),
        MenuDataService,
        ProvideDefaultsRoutesService,
        MenuStoreLoaderService,
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    }).compileComponents();
    service = TestBed.inject(RoutesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
