import { TestBed } from "@angular/core/testing";

import { RolActionsService } from "./rol-actions.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RolActionsService", () => {
  let service: RolActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RolActionsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
