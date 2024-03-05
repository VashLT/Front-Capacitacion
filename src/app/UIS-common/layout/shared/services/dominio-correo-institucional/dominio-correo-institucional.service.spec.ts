import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { DominioCorreoInstitucionalService } from "./dominio-correo-institucional.service";

describe("DominioCorreoInstitucionalService", () => {
  let service: DominioCorreoInstitucionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DominioCorreoInstitucionalService],
    });
    service = TestBed.inject(DominioCorreoInstitucionalService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
