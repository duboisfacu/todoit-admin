import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {
  // get f(){return this.signupForm.controls}

  public signupForm !: FormGroup;
  public type = this.router.url === '/home/register/cliente' ? true : false
  constructor(private router: Router, private fb: FormBuilder, private reg: RegisterService) { }

  a= this.router.events.subscribe(val => {
    if (this.router.url === '/home/register/cliente') {
      this.type = true
    }else{this.type = false}
  });

  submitForm(rol:number){
    let user:User = {
      email: this.signupForm.value.email,
      fullName: this.signupForm.value.fullName,
      address: this.signupForm.value.address,
      cellPhone: this.signupForm.value.cellPhone,
      password: this.signupForm.value.password,
      isAccepted: true,
      isDeleted: false,
      rol: {
        id: rol
      }
    }
    if (rol === 3){
      user.vehicle = { id: this.signupForm.value.vehicle}
    }
    this.reg.register(user)
    .subscribe(res =>{
      console.log(res)
      })}
      
    

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      cellPhone: new FormControl('', Validators.required),
      vehicle: new FormControl('', Validators.required),
    })
  }

}
