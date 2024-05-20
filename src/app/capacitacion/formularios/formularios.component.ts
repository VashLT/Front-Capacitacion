import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
      bio: ['']
    })
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}
