import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { AsignSupervisorComponent } from '../asign-supervisor/asign-supervisor.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';
import { GetDetailsEmpComponent } from '../get-details-emp/get-details-emp.component';
import { KpiHistoryComponent } from '../kpi-history/kpi-history.component';
import { KpiSessionComponent } from '../kpi-session/kpi-session.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  { path: 'list', 
   canActivate: [AuthGuard],
   component: EmployeeListComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  { path: 'add',
   canActivate: [AuthGuard],
    component: AddEmployeeComponent },
  {
    path: 'update/:id',
    canActivate: [AuthGuard],
    component: EmployeeUpdateComponent,
  },
  {
    path: 'asign-supervisor/:id',
    canActivate: [AuthGuard],
    component: AsignSupervisorComponent,
  },
  { path: 'profile', 
  canActivate: [AuthGuard],
   component: ProfileComponent },
  { path: 'kpi-session', 
  canActivate: [AuthGuard],
   component:KpiSessionComponent},
  { path: 'get-details/:id', 
  canActivate: [AuthGuard],
   component:GetDetailsEmpComponent},
   
  { path: 'kpi-history', 
  canActivate: [AuthGuard],
   component:KpiHistoryComponent},
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AdminRoutingModule {}
