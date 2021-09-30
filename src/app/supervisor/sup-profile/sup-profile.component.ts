import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { skip } from 'rxjs/operators';
import { Employee, Session } from 'src/app/model/employee';
import { InteractionService } from 'src/app/service/interaction.service';

import { RepoService } from 'src/app/service/repo.service';
import { KpiDetailsComponent } from 'src/app/shared/components/kpi-details/kpi-details.component';
import { environment } from 'src/environments/environment';
import { AddOwnKpiComponent } from '../add-own-kpi/add-own-kpi.component';
import { PasswordResetComponent } from '../password-reset/password-reset.component';

@Component({
  selector: 'app-sup-profile',
  templateUrl: './sup-profile.component.html',
  styleUrls: ['./sup-profile.component.scss'],
})
export class SupProfileComponent implements OnInit {
  session!: Session[];
  employee!: Employee;

  url: any;
  images!: any;
  showKPIBtn: number | boolean | undefined;
  constructor(
    private repoService: RepoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private interaction: InteractionService,
    private hotTost: HotToastService
  ) {}

  ngOnInit(): void {
    this.getActiveSession();
    this.interaction.user$.subscribe((data: any) => {
      console.log('data', data);
      this.employee = data as Employee;
      console.log(data);
      setTimeout(() => {
        this.url = `${environment.baseImageUrl}/${data?.image}`;
      }, 0);

     // console.log('url', this.url);
    });
  }

  _name = JSON.parse(localStorage.getItem('data') as string);

  super_id = this._name?.id;
  super_fname = this._name?.f_name;
  super_lname = this._name?.l_name;
  super_email = this._name?.email;
  super_phone = this._name?.phone;
  super_desig = this._name?.desig;
  super_role = this._name?.role;

  private getActiveSession = () => {
    const sessionByUrl: string = `getkpi-super/`;
    this.repoService.getData(sessionByUrl).subscribe(
      (res: any) => {
         console.log(res.data);
        this.isshowing = true;
        this.session = res.data['rows'] as Session[];
        if (this.session) {
          setTimeout(()=>{
            this.hotTost.warning(`Please give kpi to yourself and your employee also,for year: ${
              this.session?.[0]?.year
            } , 
            session:${
              this.session?.[0]?.session?.session == 1
                ? 'Jan-April'
                : this.session?.[0]?.session?.session == 2
                ? 'May-August'
                : 'Sep-Dec'
            },
                 If you have already given then please ignore this.
            `);
          },2000)
     
        }

        //   console.log(this.session);
        this.showKPIBtn =
          !this.session[0]?.is_completed && this.session[0]?.is_active
            ? true
            : false;
        // console.log('this.showKPIBtn', this.showKPIBtn);
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };

  isshowing = false;

  openKpiDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.super_id,
      sessionId: this.session[0]?.id,
      title: 'Add Kpi',
    };

    this.dialog.open(AddOwnKpiComponent, dialogConfig);
  }

  openKpiDetailsDialog(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      emp_id: id,
      givenby_id:id,
      sessionId: this.session[0]?.id,
      title: 'Kpi Details',
    };

    this.dialog.open(KpiDetailsComponent, dialogConfig);
  }

  isActive() {
    if (
      this.session?.[0]?.is_active === 1 &&
      this.session?.[0]?.is_completed === 0
    ) {
      return true;
    }
    return false;
  }

  openPasswordResetDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.super_id,
      title: 'Rest your Password',
    };

    this.dialog.open(PasswordResetComponent, dialogConfig);
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      const formData = new FormData();
      formData.append('file', this.images);
      let apiUrl = `upload-image/${this.super_id}`;
      this.repoService.upload(apiUrl, formData).subscribe((res) => {
        // this.getEmployeeById();
        this.interaction.refreshUserData(true);
        // console.log(res);
      });
    }
  }

  private getEmployeeById = () => {
    const employeeId: string = this.super_id;
    const employeeByIdUrl: string = `get-employee/${employeeId}`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res: any) => {
        console.log(res.data);
        this.employee = res.data as Employee;
        this.url = `${environment.baseImageUrl}/${this.employee?.image}`;
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };
}
