import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  opened = true;
  toggleSidebar() {
    this.opened = !this.opened;
  }
  panel!: boolean;

  cantClient: number = 0;
  cantDelivery: number = 0;
  cantAdmin: number = 0;
  cantPending: number = 0;
  cantCurrent: number = 0;
  cantFinished: number = 0;

  constructor(private router: Router, private home: HomeService) {}
  public navigationEnd = this.router.events.subscribe((val) => {
    if (this.router.url === '/home') {
      this.panel = true;
    } else {
      this.panel = false;
    }
  });
  ngOnInit(): void {
    console.log(this.router.url);
    if (this.router.url === '/home') {
      this.panel = true;
    }
    // hechos
    this.home.getTravel(9).subscribe((resp) => {
      console.log(resp);
      this.cantFinished = resp.length;
    });

    // en curso
    forkJoin([
      this.home.getTravel(2),
      this.home.getTravel(3),
      this.home.getTravel(6),
      this.home.getTravel(7),
    ]).subscribe((res) => {
      this.cantCurrent = [...res[0], ...res[1], ...res[2], ...res[3]].length;
    });

    // pendientes
    forkJoin([this.home.getTravel(1), this.home.getTravel(5)]).subscribe(
      (res) => {
        this.cantPending = [...res[0], ...res[1]].length;
      }
    );
    // clientes
    this.home.getUser().subscribe((resp) => {
      this.cantClient = resp.filter((e) => e.rol?.id === 1).length;
    });
    // cadetes
    this.home.getUser().subscribe((resp) => {
      this.cantDelivery = resp.filter((e) => e.rol?.id === 2).length;
    });
    // admins
    this.home.getUser().subscribe((resp) => {
      this.cantAdmin = resp.filter((e) => e.rol?.id === 3).length;
    });
  }
}
