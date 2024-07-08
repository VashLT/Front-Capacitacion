import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSelectTwoOptions } from '@uis/uis-lib/models';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.scss',
})
export class FormulariosComponent implements OnInit { 
  form: FormGroup;
  registerForm: FormGroup;
  roles = [
    {
      value: "est",
      name: "Estudiante"
    },
    {
      value: "admon",
      name: "Administrativo"
    },
    {
      value: "prof",
      name: "Profesor"
    },
  ]
  colors = [
    {
      name: 'rojo',
      id: 0,
    },
    {
      name: 'azul',
      id: 1,
    },
    {
      name: 'verde',
      id: 2,
    },
    {
      name: 'amarillo',
      id: 3,
    },
  ]
  colorSearch: string;
  colorConfig: MatSelectTwoOptions = {
    multiple: true,
    removable: true,
    keyInChip: 'name'
  };
  selectedFileUrl: string;
  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      rol: [null],
      description: [''],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', [Validators.required]],
      bio: [''],
      favColor: ['', Validators.required],
      phone: ['+330312445666', Validators.required],

    });

    this.registerForm.controls.password.valueChanges.subscribe((value) => {
      if (!this.registerForm.value.confirmPassword) return;

      if (value !== this.registerForm.value.confirmPassword) {
        this.registerForm.controls.confirmPassword.setErrors({
          diff: true
        });
      } else if (this.registerForm.controls.confirmPassword.hasError('diff')) {
        this.registerForm.controls.confirmPassword.setErrors(null);
      }
    })

    this.registerForm.controls.confirmPassword.valueChanges.subscribe((value) => {
      if (!this.registerForm.value.password) return;

      if (value !== this.registerForm.value.password) {
        this.registerForm.controls.confirmPassword.setErrors({
          diff: true
        });
      } else if (this.registerForm.controls.confirmPassword.hasError('diff')) {
        this.registerForm.controls.confirmPassword.setErrors(null);
      }
    })
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

  fileSelect(evt: File) {
    console.log(evt);
    this.selectedFileUrl = URL.createObjectURL(evt);
  }
}
