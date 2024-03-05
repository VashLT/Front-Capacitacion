import { TestBed } from "@angular/core/testing";

import { ParametrosToLoadService } from "./parametros-to-load.service";

describe("ParametrosToLoadService", () => {
  let service: ParametrosToLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParametrosToLoadService],
    });
    service = TestBed.inject(ParametrosToLoadService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
