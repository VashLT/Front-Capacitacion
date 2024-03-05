import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateLoaderImplService } from "./translate-loader-impl.service";

const mockMatSnackBar = {
  open: () => {},
};

describe("TranslateLoaderImplService", () => {
  let service: TranslateLoaderImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        TranslateLoaderImplService,
      ],
    });
    service = TestBed.inject(TranslateLoaderImplService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
