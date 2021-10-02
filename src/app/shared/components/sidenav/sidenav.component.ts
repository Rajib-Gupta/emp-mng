// src\app\shared\components\sidenav\sidenav.component.ts

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSidenav } from '@angular/material/sidenav';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { RepoService } from 'src/app/service/repo.service';
import { Employee } from 'src/app/model/employee';
import { environment } from 'src/environments/environment';
import { InteractionService } from 'src/app/service/interaction.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  public focus: any;
  employee!: Employee;

  url: any;

  images!: any;

  _name: any;

  admin_id: any;
  admin_fname: any;
  admin_lname: any;
  admin_email: any;
  admin_phone: any;
  admin_desig: any;

  themeColor: 'primary' | 'accent' | 'warn' = 'primary'; // ? notice this
  isDark = false; // ? notice this
  showFiller = false;
  isShowing!: boolean;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(
    private repoService: RepoService,
    private overlayContainer: OverlayContainer,
    public _authService: AuthService,
    private interaction: InteractionService
  ) {}

  ngOnInit(): void {
    this.interaction.user$.subscribe((data: any) => {
      if(!data) {
        this.url = null
        return
      };
      this.admin_id = data?.id;
      this.admin_fname = data?.f_name;
      this.admin_lname = data?.l_name;
      this.admin_email = data?.email;
      this.admin_phone = data?.phone;
      this.admin_desig = data?.desig;
      console.log("sidenav->data",data)
      if(data?.image) {

       
         setTimeout(() =>  this.url = `${environment.baseImageUrl}/${data?.image}`,0);
    
  
      }
    });
  }

  toggle() {
    this.showFiller = true;
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
