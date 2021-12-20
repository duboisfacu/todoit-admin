import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-users-selector',
  templateUrl: './users-selector.component.html',
  styleUrls: ['./users-selector.component.sass'],
})
export class UsersSelectorComponent implements OnInit {
  constructor(private router: Router) {}

  navigate(prop: string) {
    this.router.navigate([`home/users/${prop}`]);
  }

  public type?: string;
  public isClient?: boolean;
  public isDelivery?: boolean;
  public isAdmin?: boolean;
  public isAll?: boolean;

  navigationEnd = this.router.events.subscribe((val) => {
    if (val instanceof NavigationEnd) {
      this.type = 's de usuarios';
      this.isClient = false;
      this.isDelivery = false;
      this.isAdmin = false;
      this.isAll = false;
      if (this.router.url === '/home/users/cliente') {
        this.type = ' de clientes';
        this.isClient = true;
      } else if (this.router.url === '/home/users/cadete') {
        this.type = ' de cadetes';
        this.isDelivery = true;
      } else if (this.router.url === '/home/users/admin') {
        this.type = ' de administradores';
        this.isAdmin = true;
      } else if (this.router.url === '/home/users/todos') {
        this.type = ' de todos los usuarios';
        this.isAll = true;
      }
    }
  });

  ngOnInit(): void {}
}
