import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ComponentsModule } from './components/components.module';
import { SidebarModule } from 'ng-sidebar';
import { RegisterComponent } from './register/register.component';
import { ClientComponent } from './register/client/client.component';
import { DeliveryComponent } from './register/delivery/delivery.component';
import { TravelsComponent } from './travels/travels.component';


@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    ClientComponent,
    DeliveryComponent,
    TravelsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    SidebarModule.forRoot()
    
  ]
})
export class HomeModule { }
