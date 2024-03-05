import { OverlayModule } from "@angular/cdk/overlay";
import { TestBed } from "@angular/core/testing";

import { RouteChangesService } from "./route-changes.service";

describe("RouteChangesService", () => {
  let service: RouteChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule],
      providers: [RouteChangesService],
    });
    service = TestBed.inject(RouteChangesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
