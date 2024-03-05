import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { CrudService } from "@uis/uis-lib/services/crud";
import { ContrasenaHint } from "./models/contrasena-hints.model";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  form: UntypedFormGroup;
  /**
   * true: se muestra el campo password con type=password
   * false: se muestra el campo con type=text
   */
  hideCurrentPassword = true;
  /**
   * true: se muestra el campo password con type=password
   * false: se muestra el campo con type=text
   */
  hidePassword = true;
  /**
   * true: se muestra el campo confirmPassword con type=password
   * false: se muestra el campo con type=text
   */
  hideConfirmPassword = true;
  alphabet = "[A-Za-z\\d@${}.*+-]";
  regLowercase = "(?=.*[a-z])";
  regUppercase = "(?=.*[A-Z])";
  regSpecialChar = "(?=.*[@${}.*+-])";
  regNumber = "(?=.*[0-9])";
  minChars = 10;
  maxChars = 20;
  passwordHints: ContrasenaHint = {
    minLength: null,
    maxLength: null,
    lowercase: null,
    uppercase: null,
    specialChar: null,
    digit: null,
  };
  constructor(
    private formBuilder: UntypedFormBuilder,
    private crudService: CrudService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        currentPassword: ["", [Validators.required]],
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validator: this.checkPasswords,
      }
    );
  }

  /**
   * ejecuta expresiones regulares para validar
   * que la contraseña cumpla con el criterio establecido
   *
   * @param password
   */
  validatePassword(password: string) {
    const updates: any = {};
    if (password.length < this.minChars) {
      updates.minLength = false;
    } else if (!this.passwordHints.minLength) {
      updates.minLength = true;
    }

    if (password.length > this.maxChars) {
      updates.maxLength = false;
    } else if (!this.passwordHints.maxLength) {
      updates.maxLength = true;
    }

    /**
     * al menos un caracter especial: @, $, {, }, ., *, +, -
     */
    if (!this.validateRegex(this.regSpecialChar, password)) {
      updates.specialChar = false;
    } else if (!this.passwordHints.specialChar) {
      updates.specialChar = true;
    }

    /**
     * al menos una mayúscula
     */
    if (!this.validateRegex(this.regUppercase, password)) {
      updates.uppercase = false;
    } else if (!this.passwordHints.uppercase) {
      updates.uppercase = true;
    }

    /**
     * al menos una minúscula
     */
    if (!this.validateRegex(this.regLowercase, password)) {
      updates.lowercase = false;
    } else if (!this.passwordHints.lowercase) {
      updates.lowercase = true;
    }

    /**
     * al menos un digito
     */
    if (!this.validateRegex(this.regNumber, password)) {
      updates.digit = false;
    } else if (!this.passwordHints.digit) {
      updates.digit = true;
    }

    this.passwordHints = { ...this.passwordHints, ...updates };

    /**
     * si al menos un campo está en falso, se asigna un error al
     * campo
     */
    if (Object.values(this.passwordHints).some((hint) => hint === false)) {
      this.form.controls.password.setErrors({ pattern: true });
      this.form.updateValueAndValidity();
    } else if (this.form.controls.password.hasError("pattern")) {
      delete this.form.controls.password.errors.pattern;
      this.form.updateValueAndValidity();
    }
  }

  /**
   * si 'str' hace match con el regex utilizando el alfabeto
   * para contraseñas
   *
   * @param regex expresión regular
   * @param str palabra
   * @returns
   */
  validateRegex(regex, str) {
    const regx = new RegExp(regex + this.alphabet);
    return regx.test(str);
  }

  /**
   * valida que las contraseñas estén repetidas, actualiza el estado en el form
   */
  validatePwRepetition() {
    if (
      this.form.controls.password.value !==
      this.form.controls.confirmPassword.value
    ) {
      this.form.controls.confirmPassword.setErrors({ notEqual: true });
      this.form.updateValueAndValidity();
    } else if (this.form.controls.confirmPassword.hasError("notEqual")) {
      delete this.form.controls.confirmPassword.errors.notEqual;
      if (Object.keys(this.form.controls.confirmPassword.errors).length === 0) {
        this.form.controls.confirmPassword.setErrors(null);
      }
      this.form.updateValueAndValidity();
      this.form.controls.confirmPassword.markAsTouched();
    }
  }

  resetPassword(event: Event) {
    event.preventDefault();

    this.validatePwRepetition();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  limpiarFormulario(): void {
    this.form.reset();
    this.crudService.close();
  }

  checkPasswords(group: UntypedFormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    if (pass === confirmPass) {
      return null;
    }
    group.controls.confirmPassword.setErrors({ notEqual: true });
    return null;
  }
}
