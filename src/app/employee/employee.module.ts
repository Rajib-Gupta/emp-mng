import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { EmpRoutingModule } from './emp-routing/emp-routing.module';
import { AddKpiEmpComponent } from './add-kpi-emp/add-kpi-emp.component';
import { SupKpiAddComponent } from './sup-kpi-add/sup-kpi-add.component';
import { PasswordResetEmpComponent } from './password-reset-emp/password-reset-emp.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';



@NgModule({
  declarations: [
    EmpProfileComponent,
    AddKpiEmpComponent,
    SupKpiAddComponent,
    PasswordResetEmpComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    EmpRoutingModule,
    ShowHidePasswordModule
  ]
})
export class EmployeeModule { }
