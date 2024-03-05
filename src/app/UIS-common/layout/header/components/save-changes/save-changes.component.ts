import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { CrudService } from "@uis/uis-lib/services/crud";

@Component({
  selector: "app-save-changes",
  templateUrl: "./save-changes.component.html",
  styleUrls: ["./save-changes.component.scss"],
})
export class SaveChangesComponent implements OnInit {
  form: UntypedFormGroup;
  hideCurrentPassword = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private crudService: CrudService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      currentPassword: ["", [Validators.required]],
    });
  }
  limpiarFormulario() {
    this.form.reset();
    this.crudService.close();
  }
}
