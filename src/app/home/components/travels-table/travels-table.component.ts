import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TravelsService } from '../../services/travels.service';
import { Travel } from '../../model/travel';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-travels-table',
  templateUrl: './travels-table.component.html',
  styleUrls: ['./travels-table.component.sass'],
})
export class TravelsTableComponent implements OnInit {
  public loading = true;
  public page = true;
  public type: Travel[] = [];
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
  public statusPages?: Travel[];
  public emailDeliveryList?: object;
  constructor(private router: Router, private travel: TravelsService) {}

  // Chequea el URL y según en donde está va a mostrar cada tabla
  public navigationEnd = this.router.events.subscribe((val) => {
    this.loading = true;
    this.page = true;
    if (this.router.url === '/home/travels') {
      this.page = false;
    }

    this.type = [];
    if (val instanceof NavigationEnd) {
      if (this.router.url === '/home/travels/actives') {
        forkJoin([
          this.travel.get(1),
          this.travel.get(2),
          this.travel.get(3),
          this.travel.get(4),
          this.travel.get(5),
          this.travel.get(6),
          this.travel.get(7),
          this.travel.get(8),
        ]).subscribe((res) => {
          this.type = [
            ...res[0],
            ...res[1],
            ...res[2],
            ...res[3],
            ...res[4],
            ...res[5],
            ...res[6],
            ...res[7],
          ];
          this.loading = false;
          this.type.sort(function (a: Travel, b: Travel) {
            return (
              Date.parse(
                a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1]
                  .operationDate
              ) -
              Date.parse(
                b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1]
                  .operationDate
              )
            );
          });
        });
      } else if (this.router.url === '/home/travels/pendings') {
        forkJoin([this.travel.get(1), this.travel.get(5)]).subscribe((res) => {
          this.type = [...res[0], ...res[1]];
          this.loading = false;
          console.log(res);

          this.type.sort(function (a: Travel, b: Travel) {
            return (
              Date.parse(
                a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1]
                  .operationDate
              ) -
              Date.parse(
                b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1]
                  .operationDate
              )
            );
          });
        });
      } else if (this.router.url === '/home/travels/currents') {
        forkJoin([
          this.travel.get(2),
          this.travel.get(3),
          this.travel.get(6),
          this.travel.get(7),
        ]).subscribe((res) => {
          this.type = [...res[0], ...res[1], ...res[2], ...res[3]];
          this.loading = false;

          this.type.sort(function (a: Travel, b: Travel) {
            return (
              Date.parse(
                a.travelEquipmentDTOs[a.travelEquipmentDTOs.length - 1]
                  .operationDate
              ) -
              Date.parse(
                b.travelEquipmentDTOs[b.travelEquipmentDTOs.length - 1]
                  .operationDate
              )
            );
          });
        });
      }
    }
  });

  deliverySelect(
    id: number,
    statusTravel: number,
    object: Travel,
    d: HTMLSelectElement
  ) {
    Swal.fire({
      title: `Cambiar estado a\n"${this.status[statusTravel - 1]}"`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#9b4b27',
      reverseButtons: true,
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#FD611A',
      input: 'select',
      inputOptions: { 'Cadetes:': this.emailDeliveryList },
      inputLabel: 'Selecciona un cadete:',
      html:
        '<label>Razón de cambio de estado:</label>' +
        '<textarea id="observatiuon-value" placeholder="ingrese aquí el motivo"></textarea>',
    }).then((result) => {
      this.getDelivery();
      if (result.isConfirmed) {
        this.travel
          .post(
            id,
            statusTravel,
            result.value,
            false,
            (
              document.getElementById(
                'observatiuon-value'
              ) as HTMLTextAreaElement
            ).value
          )
          .subscribe(
            (resp) => {
              Swal.fire({
                title: `Estado cambiado a\n"${
                  this.status[statusTravel - 1]
                }" correctamente.`,
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#FD611A',
                icon: 'success',
              });

              this.router.navigateByUrl(this.router.url).then(() => {
                this.router.navigated = false;
                this.router.navigate([this.router.url]);
              });
            },
            (error) => {
              d.append(
                new Option(
                  this.status[object.lastStatusTravel - 1],
                  object.lastStatusTravel.toString()
                )
              );
              d.options[d.options.length - 1].selected = true;
              d.options[d.options.length - 1].hidden = true;
            }
          );
      } else {
        d.append(
          new Option(
            this.status[object.lastStatusTravel - 1],
            object.lastStatusTravel.toString()
          )
        );
        d.options[d.options.length - 1].selected = true;
        d.options[d.options.length - 1].hidden = true;
      }
    });
  }

  changeState(statusTravel: string, object: Travel, d: HTMLSelectElement) {
    if (statusTravel === '10') {
      if (
        object.lastStatusTravel !== 1 &&
        object.lastStatusTravel !== 5 &&
        object.lastStatusTravel !== 4
      ) {
        let cadeteId = object.travelEquipmentDTOs[
          object.travelEquipmentDTOs.length - 1
        ].cadete.id
          ? object.travelEquipmentDTOs[object.travelEquipmentDTOs.length - 1]
              .cadete.id
          : 0;
        Swal.fire({
          title: `¿Seguro que deseas cambiar el estado a renunciado?`,
          confirmButtonText: 'Aceptar',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#9b4b27',
          reverseButtons: true,
          confirmButtonColor: '#FD611A',
          icon: 'warning',
        }).then((result) => {
          if (result.isConfirmed) {
            if (object.lastStatusTravel < 5) {
              this.travel
                .post(object.id, 1, cadeteId, true)
                .subscribe((resp) => {});
            } else {
              this.travel
                .post(object.id, 5, cadeteId, true)
                .subscribe((resp) => {});
            }
            this.router.navigateByUrl(this.router.url).then(() => {
              this.router.navigated = false;
              this.router.navigate([this.router.url]);
            });
          } else {
            d.append(
              new Option(
                this.status[object.lastStatusTravel - 1],
                object.lastStatusTravel.toString()
              )
            );
            d.options[d.options.length - 1].selected = true;
            d.options[d.options.length - 1].hidden = true;
          }
        });
      } else {
        d.append(
          new Option(
            this.status[object.lastStatusTravel - 1],
            object.lastStatusTravel.toString()
          )
        );
        d.options[d.options.length - 1].selected = true;
        d.options[d.options.length - 1].hidden = true;

        Swal.fire({
          title: `No se puede renunciar un viaje en estado\n"${
            this.status[object.lastStatusTravel - 1]
          }"`,
          icon: 'error',
          confirmButtonText: 'Continuar',
        });
      }
    } else if (
      (Number(statusTravel) === 1 ||
        Number(statusTravel) === 5 ||
        Number(statusTravel) === 4) &&
      (object.lastStatusTravel == 1 ||
        object.lastStatusTravel == 5 ||
        object.lastStatusTravel == 4)
    ) {
      this.emailDeliveryList = {};
      this.emailDeliveryList = {
        0: 'Sin Cadete',
        ...this.emailDeliveryList,
      };
      this.deliverySelect(object.id, Number(statusTravel), object, d);
    } else {
      this.getDelivery();
      this.deliverySelect(object.id, Number(statusTravel), object, d);
    }
  }

  getDelivery() {
    this.travel.getDelivery().subscribe((resp) => {
      let emailDeliveryList = resp
        .filter((e) => e.rol?.id === 2)
        .map((e) => {
          return e.email;
        });
      let idDeliveryList: any = resp
        .filter((e) => e.rol?.id === 2 && e.isDeleted === false)
        .map((e) => {
          return e.id;
        });

      let result: any = {};
      for (let index = 0; index < emailDeliveryList.length; ++index) {
        if (idDeliveryList !== undefined) {
          result[idDeliveryList[index]] = emailDeliveryList[index];
        }
      }
      this.emailDeliveryList = result;
    });
  }

  observation(obs: string) {
    Swal.fire({
      title: `Motivo de estado actual:`,
      text: `"${obs}"`,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#FD611A',
    });
  }

  ngOnInit(): void {
    this.loading = true;
    if (this.router.url === '/home/travels') {
      this.page = false;
    }
    this.getDelivery();
  }
}
