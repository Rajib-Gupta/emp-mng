import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';

import { SupProfileComponent } from '../sup-profile/sup-profile.component'
import { EmployeeUnderComponent } from '../employee-under/employee-under.component';
import { GetEmpDetailsComponent } from '../get-emp-details/get-emp-details.component';



const routes: Routes = [
  { path: 'sup-profile', canActivate:[AuthGuard],component: SupProfileComponent },
  { path: 'employee-under', canActivate:[AuthGuard],component:EmployeeUnderComponent },
  { path: 'get-emp-details/:id', canActivate:[AuthGuard],component:GetEmpDetailsComponent },
 

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})

export class SupRoutingModule { }
