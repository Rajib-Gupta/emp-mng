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

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { AsignSupervisorComponent } from './asign-supervisor/asign-supervisor.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { ProfileComponent } from './profile/profile.component';
import { KpiSessionComponent } from './kpi-session/kpi-session.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ManageKpiSessionComponent } from './manage-kpi-session/manage-kpi-session.component';
import { GetDetailsEmpComponent } from './get-details-emp/get-details-emp.component';
import { MatSliderModule } from '@angular/material/slider';
import { KpiHistoryComponent } from './kpi-history/kpi-history.component';
import { ResetPasswordAdminComponent } from './reset-password-admin/reset-password-admin.component';
import { KpiDetailsComponent } from './kpi-details/kpi-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    EmployeeUpdateComponent,
    AsignSupervisorComponent,
    EmployeeDeleteComponent,
    ProfileComponent,
    KpiSessionComponent,
    ManageKpiSessionComponent,
    GetDetailsEmpComponent,
    KpiHistoryComponent,
    ResetPasswordAdminComponent,
    KpiDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    ShowHidePasswordModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSliderModule,
  
   
  ]
})
export class AdminModule { }
