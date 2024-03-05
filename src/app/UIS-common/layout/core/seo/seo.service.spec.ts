import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { TranslateModule } from "@ngx-translate/core";
import { SeoService } from "./seo.service";
import { ProvideDefaultsRoutesService } from "../authentication/routes/provide-defaults-routes.service";

describe("SeoService", () => {
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      providers: [provideMockStore(), SeoService, ProvideDefaultsRoutesService],
    });
    service = TestBed.inject(SeoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
