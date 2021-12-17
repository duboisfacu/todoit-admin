import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.sass']
})
export class ButtonsComponent implements OnInit {
  
  public registerButton = false 
  public myRegisterButton =false 
  public type = 'o'
  constructor(private router: Router ) { }
  
  navigate(prop:string) {
    
    if (prop === 'cliente'){
      this.registerButton = true
      this.myRegisterButton = false
      this.type = 'ar Cliente'
    }else if (prop === 'cadete'){
      this.registerButton = false
      this.myRegisterButton = true
      this.type = 'ar Cadete'
    }
    this.router.navigate([`home/register/${prop}`]);
  }
  
  
  navigationEnd= this.router.events.subscribe(val => {
    if (val instanceof NavigationEnd) {
      this.registerButton = false
      this.myRegisterButton = false
      this.type = 'o'
      this.checkRoute()
    }
  });

  checkRoute(){
    if (this.router.url === '/home/register'){
      this.registerButton = false
      this.myRegisterButton = false
      this.type = 'o'
    }else if (this.router.url === '/home/register/cliente'){
        this.registerButton = true
        this.myRegisterButton = false
        this.type = 'ar Cliente'
      }else if (this.router.url === '/home/register/cadete'){
        this.registerButton = false
        this.myRegisterButton = true
        this.type = 'ar Cadete'
      }
  }
ngOnInit(): void {
this.checkRoute
}

}
