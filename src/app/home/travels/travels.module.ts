import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelsRoutingModule } from './travels-routing.module';
import { ActivesComponent } from './actives/actives.component';
import { PendingsComponent } from './pendings/pendings.component';
import { CurrentsComponent } from './currents/currents.component';


@NgModule({
  declarations: [
    ActivesComponent,
    PendingsComponent,
    CurrentsComponent
  ],
  imports: [
    CommonModule,
    TravelsRoutingModule
  ]
})
export class TravelsModule { }
