import { TestBed } from "@angular/core/testing";

import { I18nInterceptorService } from "./i18n-interceptor.service";

describe("I18nInterceptorService", () => {
  let service: I18nInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nInterceptorService],
    });
    service = TestBed.inject(I18nInterceptorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
