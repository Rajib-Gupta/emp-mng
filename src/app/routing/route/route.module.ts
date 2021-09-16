
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home/home.component';
import { SignInComponent } from 'src/app/auth/sign-in/sign-in.component';
import { AuthGuard } from 'src/app/guard/auth.guard';


const routes: Routes = [
  { path: '',canActivate:[AuthGuard], component: HomeComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },

  { path: 'signin', component: SignInComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },

  {
    path: 'admin',
    loadChildren: () =>
      import('../../admin/admin.module').then((m) => m.AdminModule),
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
