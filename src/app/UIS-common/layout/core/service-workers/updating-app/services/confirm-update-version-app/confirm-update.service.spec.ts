import { TranslateModule } from "@ngx-translate/core";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { TestBed } from "@angular/core/testing";
import { ServiceWorkerModule } from "@angular/service-worker";

import { ConfirmUpdateService } from "./confirm-update.service";
import { NewTranslatePipe } from "@uis/uis-lib/pipes/newTranslate";
import { MatSnackBarModule } from "@angular/material/snack-bar";

describe("ConfirmUpdateService", () => {
  let service: ConfirmUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ServiceWorkerModule.register("ngsw-worker.js", {
          enabled: false,
        }),
        TranslateModule.forRoot({}),
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        ConfirmUpdateService,
        NewTranslatePipe,
      ],
    });
    service = TestBed.inject(ConfirmUpdateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
