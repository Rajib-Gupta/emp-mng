import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard.component';
import { SupProfileComponent } from 'src/app/supervisor/sup-profile/sup-profile.component';
import { IsAdminGuard } from 'src/app/guard/is-admin.guard';
import { IsSuperGuard } from 'src/app/guard/is-super.guard';
import { SignInGuard } from 'src/app/guard/sign-in.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard,IsAdminGuard],
    component: DashboardComponent,
  },
  // Eto gulo index router mane hoina
  // ekta single index route thkabe je role er descide korbe route access kora jabe kina. maintain korte fete jabe
  // { path: '', redirectTo: '/', pathMatch: 'full' },

   { path: '', canActivate: [AuthGuard,IsSuperGuard], component: SupProfileComponent },
   { path: '', redirectTo: '/', pathMatch: 'full' },

  { path: 'signin',canActivate:[SignInGuard], component: SignInComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },

  {
    path: 'admin',
    canActivate: [AuthGuard,IsAdminGuard],
    loadChildren: () =>
      import('../../admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: 'supervisor',
    loadChildren: () =>
      import('../../supervisor/supervisor.module').then(
        (m) => m.SupervisorModule
      ),
  },
  {
    path: 'employee',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../../employee/employee.module').then(
        (m) => m.EmployeeModule
      ),
  },

  { path: '', redirectTo: '/admin', pathMatch: 'full' },

  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
