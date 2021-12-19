import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Travel } from '../../model/travel';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.sass']
})
export class HistoryTableComponent implements OnInit {

  public loading = true
  public travels: Travel[] = []
  public travels2: Travel[] = []
  public cross!: boolean

  constructor(private history: HistoryService) { }
  public status:Array<string> = ['Retiro pendiente', 'Retiro asignado', 'Retirado' , 'Reparación pendiente', 'Reparado', 'Entega asignada', 'Entrega pendiente', 'Entregado', 'Recibido', 'Renunciado']


  onChange(search: string) {
    
    if (search === ''){this.cross = false}
    else {this.cross = true}

    const filteredData = this.travels.filter((value: Travel) => {
      const searchStr = search.toLowerCase()
      let deliveryeMatches = false
      let clientMatches = false
      let dateMatches = false
      let hourMatches = false
      let statusMatches = false

        deliveryeMatches = value.travelEquipmentDTOs[value.travelEquipmentDTOs.length - 1].cadete?.fullName.toLowerCase().includes(searchStr);
        clientMatches = value.travelEquipmentDTOs[value.travelEquipmentDTOs.length -1].equipment.cliente.fullName.toLowerCase().includes(searchStr);
        dateMatches = value.travelEquipmentDTOs[value.travelEquipmentDTOs.length -1].operationDate.toString().slice(0, 10).includes(searchStr)
        hourMatches = value.travelEquipmentDTOs[value.travelEquipmentDTOs.length -1].operationDate.toString().slice(11, 16).includes(searchStr)
        statusMatches = value.statusEquipment ? value.statusEquipment?.toLowerCase().includes(searchStr) : false;

      return deliveryeMatches || clientMatches || dateMatches || hourMatches || statusMatches
    }); 
    this.travels2 = filteredData
    return true
  }

  onLoad(){
    let one = this.history.get(1)
    let two = this.history.get(2)
    let three = this.history.get(3)
    let four = this.history.get(4)
    let five = this.history.get(5)
    let six = this.history.get(6)
    let seven = this.history.get(7)
    let eight = this.history.get(8)
    let nine = this.history.get(9)
    
    forkJoin([one, two, three, four, five, six, seven, eight, nine])
    .subscribe(
      results => {
        this.travels = [...results[0], ...results[1], ...results[3],...results[4],...results[5],...results[6],...results[7],...results[8]]

        
        this.travels.sort(function (a: Travel, b: Travel) {
          return a.lastStatusTravel - b.lastStatusTravel
        })
        
        console.log(this.travels)
        this.loading = false
        this.travels2 = this.travels
        this.travels2.filter((value: Travel) => {
          value.statusEquipment = this.status[value.lastStatusTravel - 1]
          value.travelEquipmentDTOs[value.travelEquipmentDTOs.length - 1].cadete = {
            id: value.travelEquipmentDTOs[value.travelEquipmentDTOs.length - 1].cadete?.id,
            fullName: value.travelEquipmentDTOs[value.travelEquipmentDTOs.length - 1].cadete?.fullName ? value.travelEquipmentDTOs[value.travelEquipmentDTOs.length - 1].cadete?.fullName : 'Sin Cadete'
        
          }
          console.log(value)
        })
      }
      );
  }

  ngOnInit(): void {
    this.onLoad()
  }
}
