import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-travels-selector',
  templateUrl: './travels-selector.component.html',
  styleUrls: ['./travels-selector.component.sass']
})
export class TravelsSelectorComponent implements OnInit {

  constructor(private router: Router) { }

  navigate(prop:string) {
    this.router.navigate([`home/travels/${prop}`]);
  }

  public type?:string
  public isActives?:boolean
  public isPendings?:boolean 
  public isCurrent?:boolean

  navigationEnd= this.router.events.subscribe(val => {
    if (val instanceof NavigationEnd) {
      this.type = ''
      this.isActives = false
      this.isPendings =false
      this.isCurrent = false
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
