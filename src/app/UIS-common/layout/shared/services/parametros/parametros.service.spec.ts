import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { ParametrosService } from "./parametros.service";

describe("ParametrosService", () => {
  let service: ParametrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParametrosService],
    });
    service = TestBed.inject(ParametrosService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
