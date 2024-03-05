import { OverlayModule } from "@angular/cdk/overlay";
import { TestBed } from "@angular/core/testing";

import { DownloadFileModalInterceptor } from "./download-file-modal.interceptor";

describe("DownloadFileModalInterceptor", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [OverlayModule],
      providers: [DownloadFileModalInterceptor],
    })
  );

  it("should be created", () => {
    const interceptor: DownloadFileModalInterceptor = TestBed.inject(
      DownloadFileModalInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
