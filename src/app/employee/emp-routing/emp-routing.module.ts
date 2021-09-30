import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { EmpProfileComponent } from '../emp-profile/emp-profile.component';

const routes: Routes = [
  { path: 'emp-profile', canActivate:[AuthGuard],component: EmpProfileComponent },
  
 
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class EmpRoutingModule { }
