import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { User } from '../../model/user';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass'],
})
export class RegisterFormComponent implements OnInit {
  public signupForm!: FormGroup;
  public type!: number;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private reg: RegisterService
  ) {}

  a = this.router.events.subscribe((val) => {
    if (this.router.url === '/home/register/cliente') {
      this.type = 3;
    } else if (this.router.url === '/home/register/cadete') {
      this.type = 2;
    } else if (this.router.url === '/home/register/admin') {
      this.type = 1;
    }
    this.loadInputs();
  });

  submitForm(rol: number) {
    let user: User = {
      email: this.signupForm.value.email,
      fullName: this.signupForm.value.fullName,
      address: this.signupForm.value.address,
      cellPhone: this.signupForm.value.cellPhone,
      password: this.signupForm.value.password,
      isAccepted: true,
      isDeleted: false,
      rol: {
        id: rol,
      },
    };
    if (rol === 2) {
      user.vehicle = { id: this.signupForm.value.vehicle };
    }
    this.reg.register(user).subscribe(
      (res) => {
        Swal.fire({
          title: 'Usuario creado correctamente!',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#FD611A',
        });
      },
      (err) => {
        if ((err = err.error === 'Usuario ya existe')) {
          Swal.fire({
            title: 'El email ingresado ya existe!',
            icon: 'error',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#FD611A',
          });
        } else {
          Swal.fire({
            title: 'Error inesperado',
            icon: 'error',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#FD611A',
          });
        }
      }
    );
  }

  loadInputs() {
    if (this.router.url === '/home/register/cadete') {
      this.type = 2;
      this.signupForm = this.fb.group({
        fullName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        cellPhone: new FormControl('', Validators.required),
        vehicle: new FormControl('', Validators.required),
      });
    } else {
      if (this.router.url === '/home/register/cliente') {
        this.type = 3;
      } else if (this.router.url === '/home/register/admin') {
        this.type = 1;
      }
      this.signupForm = this.fb.group({
        fullName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        cellPhone: new FormControl('', Validators.required),
      });
    }
  }

  ngOnInit(): void {
    this.loadInputs();
  }
}
