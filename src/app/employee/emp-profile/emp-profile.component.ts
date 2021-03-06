import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { addKpi, Employee, Session } from 'src/app/model/employee';
import { InteractionService } from 'src/app/service/interaction.service';
import { RepoService } from 'src/app/service/repo.service';
import { KpiDetailsComponent } from 'src/app/shared/components/kpi-details/kpi-details.component';
import { environment } from 'src/environments/environment';
import { AddKpiEmpComponent } from '../add-kpi-emp/add-kpi-emp.component';
import { PasswordResetEmpComponent } from '../password-reset-emp/password-reset-emp.component';
import { SupKpiAddComponent } from '../sup-kpi-add/sup-kpi-add.component';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss'],
})
export class EmpProfileComponent implements OnInit {
  isDisAllowForEmp = false;
  isDisAllowForSup = false;
  getKpiActiveStatus(kpi: any): void | undefined {
    if (kpi?.emp_id === kpi?.givenby_id && kpi?.kpi_details) {
      this.isDisAllowForEmp = true;
    }

    if (
      kpi?.givenby_id == this.employee.id &&
      kpi?.emp_id == this.employee?.supervisor_id
    ) {
      this.isDisAllowForSup = true;
    }
  }

  employee!: Employee;
  showKPIBtn: number | boolean | undefined;
  url: any;
  kpiData: any;
  images!: any;
  session!: Session[];
  constructor(
    private repoService: RepoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private interaction: InteractionService,
    private hotTost: HotToastService
  ) {}

  ngOnInit(): void {
      this.getActiveSession()
    this.dialog.afterAllClosed.subscribe((modalCloseModal) => {
      console.log(`Closing modal`, modalCloseModal);
      this.getEmployeeKpiCurrentDetails();
    });
    this.interaction.user$.subscribe((data: any) => {
      console.log('data', data);
      this.employee = data as Employee;
      this.getEmployeeKpiCurrentDetails();
      console.log(data);
      if (this.employee?.image) {
        setTimeout(() => {
          this.url = `${environment.baseImageUrl}/${data?.image}`;
        }, 0);
      }

      console.log('url', this.url);
    });
  }

  _name = JSON.parse(localStorage.getItem('data') as string);

  employee_id = this._name?.id;
  employee_fname = this._name?.f_name;
  employee_lname = this._name?.l_name;
  employee_email = this._name?.email;
  employee_phone = this._name?.phone;
  employee_desig = this._name?.desig;
  employee_role = this._name?.role;
  employee_supervisor = this._name?.supervisor_id;

  isSubmitted() {
    if (this.session?.[0]?.employee_kpis?.[0]?.givenby_id == this.employee_id) {
      return true;
    }
    return false;
  }

  private getActiveSession = () => {
    const sessionByUrl: string = `getkpi-super/`;
    this.repoService.getData(sessionByUrl).subscribe(
      (res: any) => {
        console.log(res.data);
        this.session = res.data['rows'] as Session[];
        if (this.session) {
          setTimeout(() => {
            this.hotTost
              .warning(`Please give kpi to yourself and your supervisor also,for year: ${
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
          }, 2000);
        }else {
          setTimeout(() => {
            this.hotTost.error(
              `Session is closed, You can check your given Kpi Details of previous Session!`
            );
          }, 3000);
        }
        // console.log(this.session);
        this.showKPIBtn =
          !this.session[0]?.is_completed && this.session[0]?.is_active
            ? true
            : false;
        console.log('this.showKPIBtn', this.showKPIBtn);
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };

  private getEmployeeKpiCurrentDetails = () => {
    let details: any = {
      givenby_id: this.employee?.supervisor_id,
      emp_id: this.employee?.id,
    };
    // console.log('======>', details);
    if(!Object.keys(details).length) return
    const sessionByUrl: string = `get-details-submitKpi/`;
    this.repoService.create(sessionByUrl, details).subscribe(
      (res: any) => {
        console.log(res.data);
  
        this.kpiData = res.data as addKpi[];
        this.kpiData = this.kpiData.forEach((kpi: any) => {
          this.getKpiActiveStatus(kpi);
        });
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };

  openKpiDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: this.employee_id,
      sessionId: this.session[0].id,
      title: 'Add Kpi',
    };

    this.dialog.open(AddKpiEmpComponent, dialogConfig);
  }

  openSupKpiDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: this.employee_supervisor,
      sessionId: this.session[0].id,
      title: 'Add Kpi',
    };

    this.dialog.open(SupKpiAddComponent, dialogConfig);
  }

  ownKpiDetailsDialog(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      emp_id: id,
      givenby_id: id,
      title: 'Kpi Details',
    };

    this.dialog.open(KpiDetailsComponent, dialogConfig);
  }

  supKpiDetailsDialog(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      emp_id: id,
      givenby_id: this.employee.id,
      title: 'Kpi Details',
    };

    this.dialog.open(KpiDetailsComponent, dialogConfig);
  }
  isActive() {
    if (
      this.session?.[0]?.is_active == 1 &&
      this.session?.[0]?.is_completed == 0
    ) {
      return false;
    }
    return true;
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const ext = file.type.split('/')[1];
      if (ext.match(/(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|JFIF)/gi)) {
        this.images = file;
        const formData = new FormData();
        formData.append('file', this.images);
        let apiUrl = `upload-image/${this.employee_id}`;
        this.repoService.upload(apiUrl, formData).subscribe((res) => {
          this.getEmployeeById();
          // console.log(res);
        }),
          (error: any) => {
            console.log(error);
            this.hotTost.error(error.message);
          };
      } else {
        this.hotTost.warning('Please select a valid  image file');
      }
    }
  }

  isshowing = false;

  private getEmployeeById = () => {
    const employeeId: string = this.employee_id;
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

  openPasswordResetDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.employee_id,
      title: 'Rest your Password',
    };

    this.dialog.open(PasswordResetEmpComponent, dialogConfig);
  }
}
