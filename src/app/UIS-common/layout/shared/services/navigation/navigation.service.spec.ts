import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NavigationService } from "./navigation.service";

describe("NavigationService", () => {
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [NavigationService],
    });
    service = TestBed.inject(NavigationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
