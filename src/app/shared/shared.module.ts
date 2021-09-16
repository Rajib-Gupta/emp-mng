// src/app/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RoutingModule } from '../routing/route/route.module'
import { NgbTooltipModule, } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, MaterialModule,RoutingModule,NgbTooltipModule,MDBBootstrapModule.forRoot()],
  exports: [SidenavComponent], // ? added
})
export class SharedModule {}
