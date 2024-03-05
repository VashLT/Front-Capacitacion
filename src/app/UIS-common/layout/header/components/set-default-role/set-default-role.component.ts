import { Component, Inject, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CrudService } from "@uis/uis-lib/services/crud";
import { UserService } from "../edit-profile/services/user.service";
import { Rol } from "./models/rol";
import { RolService } from "./services/rol.service";

@Component({
  selector: "app-set-default-role",
  templateUrl: "./set-default-role.component.html",
  styleUrls: ["./set-default-role.component.scss"],
  providers: [UserService, RolService],
})
export class SetDefaultRoleComponent implements OnInit {
  idUser: number;
  userName: string;
  defaultRole = 0;
  form: UntypedFormGroup;
  roles: Rol[] = [];
  selected = "ss";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: UntypedFormBuilder,
    private rolService: RolService,
    private userService: UserService,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idUserRol: ["", [Validators.required]],
    });
    if (!this.data.idUser) {
      return;
    }
    this.rolService.getRolesByUser(this.data.idUser).subscribe((res) => {
      this.roles = res;
      this.roles.forEach((rol) => {
        if (rol.rolPorDefecto) {
          this.defaultRole = rol.id;
        }
      });
    });
    this.userService.getUserById(this.data.idUser).subscribe((usuario) => {
      this.userName = usuario.nombreUsuario;
    });
  }

  limpiarFormulario() {
    this.form.reset();
    this.crudService.close();
  }
}
