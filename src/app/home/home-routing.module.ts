import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ClientComponent } from './register/client/client.component';
import { DeliveryComponent } from './register/delivery/delivery.component';
import { RegisterComponent } from './register/register.component';
import { ActivesComponent } from './travels/actives/actives.component';
import { CurrentsComponent } from './travels/currents/currents.component';
import { PendingsComponent } from './travels/pendings/pendings.component';
import { TravelsComponent } from './travels/travels.component';
import { HistoryComponent } from './history/history.component';
import { AdminComponent } from './users/admin/admin.component';
import { UsersComponent } from './users/users.component';
import { AllComponent } from './users/all/all.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        children: [
          {
            path: 'cliente',
            component: ClientComponent,
          },
          {
            path: 'cadete',
            component: DeliveryComponent,
          },
          {
            path: 'admin',
            component: AdminComponent,
          },
        ],
      },
      {
        path: 'travels',
        component: TravelsComponent,
        children: [
          {
            path: 'actives',
            component: ActivesComponent,
          },
          {
            path: 'currents',
            component: CurrentsComponent,
          },
          {
            path: 'pendings',
            component: PendingsComponent,
          },
        ],
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: 'cliente',
            component: ClientComponent,
          },
          {
            path: 'cadete',
            component: DeliveryComponent,
          },
          {
            path: 'admin',
            component: AdminComponent,
          },
          {
            path: 'todos',
            component: AllComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
