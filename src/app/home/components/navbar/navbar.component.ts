import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar, SidebarModule } from 'ng-sidebar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  public open?: boolean;

  constructor(private router: Router, private sb: Sidebar) {}

  currentClient = '';
  ngOnInit(): void {
    if (
      JSON.parse(localStorage.getItem('name') || '')
        .split(' ')
        .slice(0, -1)
        .join(' ').length > 0
    ) {
      this.currentClient = JSON.parse(localStorage.getItem('name') || '').split(
        ' '
      )[0];
    } else {
      this.currentClient = JSON.parse(localStorage.getItem('name') || '');
    }
  }

  navigate(prop: string) {
    this.router.navigate([`home/${prop}`]);
  }
  logout(prop: string) {
    localStorage.clear();
    this.router.navigate([`/${prop}`]);
  }
}
