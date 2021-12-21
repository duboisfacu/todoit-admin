import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Travel } from '../../model/travel';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.sass'],
})
export class HistoryTableComponent implements OnInit {
  public loading = true;
  public travels: Travel[] = [];
  public travels2: Travel[] = [];
  public cross!: boolean;

  constructor(private history: HistoryService) {}
  public status: Array<string> = [
    'Retiro pendiente',
    'Retiro asignado',
    'Retirado',
    'Reparación pendiente',
    'Reparado',
    'Entega asignada',
    'Entrega pendiente',
    'Entregado',
    'Recibido',
    'Renunciado',
  ];

  onChange(search: string) {
    if (search === '') {
      this.cross = false;
    } else {
      this.cross = true;
    }

    const filteredData = this.travels.filter((value: Travel) => {
      const searchStr = search.toLowerCase();
      let deliveryeMatches = false;
      let clientMatches = false;
      let dateMatches = false;
      let hourMatches = false;
      let statusMatches = false;

      deliveryeMatches = value.travelEquipmentDTOs[
        value.travelEquipmentDTOs.length - 1
      ].cadete?.fullName
        .toLowerCase()
        .includes(searchStr);
      clientMatches = value.travelEquipmentDTOs[
        value.travelEquipmentDTOs.length - 1
      ].equipment.cliente.fullName
        .toLowerCase()
        .includes(searchStr);
      dateMatches = value.travelEquipmentDTOs[
        value.travelEquipmentDTOs.length - 1
      ].operationDate
        .toString()
        .slice(0, 10)
        .includes(searchStr);
      hourMatches = value.travelEquipmentDTOs[
        value.travelEquipmentDTOs.length - 1
      ].operationDate
        .toString()
        .slice(11, 16)
        .includes(searchStr);
      statusMatches = value.statusEquipment
        ? value.statusEquipment?.toLowerCase().includes(searchStr)
        : false;

      return (
        deliveryeMatches ||
        clientMatches ||
        dateMatches ||
        hourMatches ||
        statusMatches
      );
    });
    this.travels2 = filteredData;
    return true;
  }

  onLoad() {
    this.history.get(9).subscribe((results) => {
      this.travels = results;

      this.travels.sort(function (a: Travel, b: Travel) {
        return a.lastStatusTravel - b.lastStatusTravel;
      });

      this.loading = false;
      this.travels2 = this.travels;
      this.travels2.filter((value: Travel) => {
        value.statusEquipment = this.status[value.lastStatusTravel - 1];
        value.travelEquipmentDTOs[value.travelEquipmentDTOs.length - 1].cadete =
          {
            id: value.travelEquipmentDTOs[value.travelEquipmentDTOs.length - 1]
              .cadete?.id,
            fullName: value.travelEquipmentDTOs[
              value.travelEquipmentDTOs.length - 1
            ].cadete?.fullName
              ? value.travelEquipmentDTOs[value.travelEquipmentDTOs.length - 1]
                  .cadete?.fullName
              : 'Sin Cadete',
          };
      });
    });
  }

  ngOnInit(): void {
    this.onLoad();
  }
}
