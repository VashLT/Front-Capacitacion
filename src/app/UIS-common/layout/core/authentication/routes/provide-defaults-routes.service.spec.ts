import { TestBed } from "@angular/core/testing";

import { ProvideDefaultsRoutesService } from "./provide-defaults-routes.service";

describe("ProvideDefaultsRoutesService", () => {
  let service: ProvideDefaultsRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvideDefaultsRoutesService],
    });
    service = TestBed.inject(ProvideDefaultsRoutesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
