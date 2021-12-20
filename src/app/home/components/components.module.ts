import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarModule } from 'ng-sidebar';
import { ButtonsComponent } from './buttons/buttons.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TravelsTableComponent } from './travels-table/travels-table.component';
import { TravelsSelectorComponent } from './travels-selector/travels-selector.component';
import { HistoryTableComponent } from './history-table/history-table.component';
import { UsersSelectorComponent } from './users-selector/users-selector.component';
import { UsersTableComponent } from './users-table/users-table.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ButtonsComponent,
    RegisterFormComponent,
    TravelsTableComponent,
    TravelsSelectorComponent,
    HistoryTableComponent,
    UsersSelectorComponent,
    UsersTableComponent,
  ],
  imports: [CommonModule, SidebarModule, FormsModule, ReactiveFormsModule],
  exports: [
    NavbarComponent,
    ButtonsComponent,
    RegisterFormComponent,
    TravelsTableComponent,
    TravelsSelectorComponent,
    HistoryTableComponent,
    UsersSelectorComponent,
    UsersTableComponent,
  ],
})
export class ComponentsModule {}
