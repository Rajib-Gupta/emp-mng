import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupRoutingModule } from './sup-routing/sup-routing.module';
import { EmployeeUnderComponent } from './employee-under/employee-under.component';
import { GetEmpDetailsComponent } from './get-emp-details/get-emp-details.component';
import { AddKpiComponent } from './add-kpi/add-kpi.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddOwnKpiComponent } from './add-own-kpi/add-own-kpi.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

@NgModule({
  declarations: [
    EmployeeUnderComponent,
    GetEmpDetailsComponent,
    AddKpiComponent,
    AddOwnKpiComponent,
    PasswordResetComponent
  ],
  imports: [CommonModule, SupRoutingModule,MaterialModule,ReactiveFormsModule,ShowHidePasswordModule],
})
export class SupervisorModule {}
