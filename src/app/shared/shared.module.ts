// src/app/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RoutingModule } from '../routing/route/route.module'
import { NgbTooltipModule, } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { KpiDetailsComponent } from './components/kpi-details/kpi-details.component';

@NgModule({
  declarations: [SidenavComponent, KpiDetailsComponent],
  imports: [CommonModule, MaterialModule,RoutingModule,NgbTooltipModule,MDBBootstrapModule.forRoot()],
  exports: [SidenavComponent,KpiDetailsComponent], // ? added
})
export class SharedModule {}
