import { TestBed } from "@angular/core/testing";

import { LosetasService } from "./losetas.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

describe("LosetasService", () => {
  let service: LosetasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
    });
    service = TestBed.inject(LosetasService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
