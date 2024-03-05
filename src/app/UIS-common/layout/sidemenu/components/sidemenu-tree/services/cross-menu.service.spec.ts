import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { CrossMenuService } from "./cross-menu.service";

describe("CrossMenuService", () => {
  let service: CrossMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
    });
    service = TestBed.inject(CrossMenuService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
