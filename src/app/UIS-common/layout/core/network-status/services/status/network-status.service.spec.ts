import { TranslateModule } from "@ngx-translate/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TestBed } from "@angular/core/testing";

import { NetworkStatusService } from "./network-status.service";

describe("NetworkStatusService", () => {
  let service: NetworkStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, TranslateModule.forRoot({})],
      providers: [NetworkStatusService],
    });
    service = TestBed.inject(NetworkStatusService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
