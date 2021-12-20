import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AllComponent } from './all/all.component';


@NgModule({
  declarations: [
    AdminComponent,
    ClientComponent,
    DeliveryComponent,
    AllComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
