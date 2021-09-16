import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { AsignSupervisorComponent } from './asign-supervisor/asign-supervisor.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    AdminProfileComponent,
    EmployeeUpdateComponent,
    AsignSupervisorComponent,
    EmployeeDeleteComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    ShowHidePasswordModule
  
   
  ]
})
export class AdminModule { }
