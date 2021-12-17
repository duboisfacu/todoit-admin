import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TravelsService } from '../../services/travels.service';
import { Travel } from '../../model/travel';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-travels-table',
  templateUrl: './travels-table.component.html',
  styleUrls: ['./travels-table.component.sass']
})
export class TravelsTableComponent implements OnInit {

  public type ? : Travel[]
  public status:Array<string> = ['Retiro pendiente', 'Retiro asignado', 'Retirado' , 'Reparación pendiente', 'Reparado', 'Entega asignada', 'Entrega pendiente', 'Entregado', 'Recibido', 'Renunciado']
  public statusPages?: Travel[]
  constructor(private router: Router, private travel: TravelsService) {}

  navigationEnd = this.router.events.subscribe(val => {
    this.type = []
    if (val instanceof NavigationEnd) {
      if (this.router.url === '/home/travels/actives') {
        forkJoin([
          this.travel.get(1), this.travel.get(2), this.travel.get(3), this.travel.get(4), this.travel.get(5), this.travel.get(6), this.travel.get(7), this.travel.get(8),
        ]).subscribe(res => {
          this.type = [...res[0], ...res[1], ...res[2], ...res[3], ...res[4], ...res[5], ...res[6], ...res[7]]
          console.log(this.type)
          this.type.sort(function (a: Travel, b: Travel) {
            return Date.parse(a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1].operationDate) - Date.parse(b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1].operationDate)
          })
        })
      } else if (this.router.url === '/home/travels/pendings') {
        forkJoin([this.travel.get(1), this.travel.get(5)]).subscribe(res => {
          this.type = [...res[0], ...res[1]]
          console.log(this.type)
          this.type.sort(function (a: Travel, b: Travel) {
            return Date.parse(a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1].operationDate) - Date.parse(b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1].operationDate)
          })
        })
      } else if (this.router.url === '/home/travels/currents') {
        forkJoin([this.travel.get(2), this.travel.get(3), this.travel.get(6), this.travel.get(7), ]).subscribe(res => {
          this.type = [...res[0], ...res[1], ...res[2], ...res[3]]
          console.log(this.type)
          this.type.sort(function (a: Travel, b: Travel) {
            return Date.parse(a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1].operationDate) - Date.parse(b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1].operationDate)
          })
        })
      }
    }

  })

  ngOnInit(): void {}

}
