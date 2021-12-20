import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.sass'],
})
export class ButtonsComponent implements OnInit {
  constructor(private router: Router) {}
  navigate(prop: string) {
    this.router.navigate([`home/register/${prop}`]);
  }

  public type?: string;
  public isAdmin?: boolean;
  public isDelivery?: boolean;
  public isClient?: boolean;

  navigationEnd = this.router.events.subscribe((val) => {
    if (val instanceof NavigationEnd) {
      this.type = 'usuario';
      this.isAdmin = false;
      this.isDelivery = false;
      this.isClient = false;
      if (this.router.url === '/home/register/admin') {
        this.type = 'administrador';
        this.isAdmin = true;
      } else if (this.router.url === '/home/register/cadete') {
        this.type = 'cadete';
        this.isDelivery = true;
      } else if (this.router.url === '/home/register/cliente') {
        this.type = 'cliente';
        this.isClient = true;
      }
    }
  });

  ngOnInit(): void {}
}
