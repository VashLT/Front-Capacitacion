import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { RouteGuard } from "./route-guard.guard";
import { RoutesService } from "./routes.service";
import { ProvideDefaultsRoutesService } from "./provide-defaults-routes.service";
import { MenuService } from "../../bootstrap/menu.service";
import { MenuStoreLoaderService } from "../../bootstrap/menu-store-loader.service";
import { MenuDataService } from "../../../store/menu/menu-data.service";

const mockMatSnackBar = {
  open: () => {},
};

describe("RouteGuard", () => {
  let guard: RouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        ProvideDefaultsRoutesService,
        provideMockStore(),
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        RouteGuard,
        RoutesService,
        MenuService,
        MenuDataService,
        MenuStoreLoaderService,
      ],
    });
    guard = TestBed.inject(RouteGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
