import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module'; // ? <-- Added
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import {FontAwesomeModule}from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './admin/admin.module';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
 
    HttpClientModule,
    SharedModule, // ? <-- Added
    RouterModule, AppRoutingModule,
    AuthModule,
    AdminModule,
    FontAwesomeModule,
    ShowHidePasswordModule,
    NgbModule,
  
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
