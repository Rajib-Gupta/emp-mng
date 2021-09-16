// src\app\shared\components\sidenav\sidenav.component.ts

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  themeColor: 'primary' | 'accent' | 'warn' = 'primary'; // ? notice this
  isDark = false; // ? notice this
  showFiller = false;
  isShowing!: boolean;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private overlayContainer: OverlayContainer,private observer: BreakpointObserver,public _authService:AuthService) {}
  
  ngOnInit(): void {
    
  }
   
  _name = JSON.parse(localStorage.getItem('data') as string);

  admin_fname = this._name?.f_name;
  admin_lname = this._name?.l_name;
  admin_email = this._name?.email;
  admin_phone = this._name?.phone;

  toggle(){
    this.showFiller=true;
  }
  // ? notice below
  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlayContainer
        .getContainerElement()
        .classList.remove('dark-theme');
    }
  }
  

  toggleSidenav() {
     this.isShowing = !this.isShowing;
  }
  
  callMethods() {
      this.toggleSidenav();
  }


  
  public positionOptions: TooltipPosition[] = ['left']; // Tooltip postion
  // tslint:disable-next-line:typedef
  public position = new FormControl(this.positionOptions[0]); 



}
