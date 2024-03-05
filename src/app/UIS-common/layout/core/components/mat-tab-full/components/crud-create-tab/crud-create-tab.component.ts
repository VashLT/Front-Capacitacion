import { Component, OnInit, Inject } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

/**
 * componente utilizado para crear una ventan modal donde se
 * introduce el nombre de la nueva pestaña a crear en el componente @see MatTabFullComponent
 */
@Component({
  selector: "app-crud-create-tab",
  templateUrl: "./crud-create-tab.component.html",
  styleUrls: ["./crud-create-tab.component.scss"],
})
export class CrudCreateTabComponent implements OnInit {
  form: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      label: ["", Validators.required],
    });
  }

  limpiarFormulario() {
    this.data.close();
  }
}
