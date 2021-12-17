import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.sass']
})
export class TravelsComponent implements OnInit {

  constructor(private router: Router) { }
  public type = this.router.url === '/home/register' ? false : true

  a= this.router.events.subscribe(val => {
    if (this.router.url === '/home/register') {
      this.type = false
    }else{this.type = true}
  });
  
  ngOnInit(): void {

  }

}