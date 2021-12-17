import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-travels-selector',
  templateUrl: './travels-selector.component.html',
  styleUrls: ['./travels-selector.component.sass']
})
export class TravelsSelectorComponent implements OnInit {
  navigate(prop:string) {
    this.router.navigate([`home/travels/${prop}`]);
  }
  constructor(private router: Router) { }

  public type:string = "" 
  public isActives:boolean =false
  public isPendings:boolean =false
  public isCurrent:boolean =false

  navigationEnd= this.router.events.subscribe(val => {
    if (val instanceof NavigationEnd) {
      this.type = ''
      if (this.router.url === '/home/travels/actives'){
        this.type = 'activos'
        this.isActives =true
      }else if (this.router.url === '/home/travels/pendings'){
          this.type = 'pendientes'
          this.isPendings =true
        }else if (this.router.url === '/home/travels/currents'){
          this.type = 'en curso'
          this.isCurrent = true
        }
    }})
    



  ngOnInit(): void {
  }

}
