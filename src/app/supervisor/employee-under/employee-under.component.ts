import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Admin,
  Employee,
  EmployeeUpdate,
  Session,
} from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddKpiComponent } from '../add-kpi/add-kpi.component';
import { KpiDetailsComponent } from 'src/app/shared/components/kpi-details/kpi-details.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-under',
  templateUrl: './employee-under.component.html',
  styleUrls: ['./employee-under.component.scss'],
})
export class EmployeeUnderComponent implements OnInit {
  employees!: EmployeeUpdate[];
  showKPIBtn: number | boolean | undefined;
  session!: Session[];

  constructor(
    private repoService: RepoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllEmployees();
    this.getActiveSession();
    this.dialog.afterAllClosed.subscribe((modalCloseModal) => {
      console.log(`Closing modal`, modalCloseModal);
      this.getActiveSession();
    });
  }

  _name = JSON.parse(localStorage.getItem('data') as string);

  super_id = this._name?.id;

  public getAllEmployees = () => {
    const employeeByIdUrl: string = `emp-under-super/${this.super_id}`;
    this.repoService.getData(employeeByIdUrl).subscribe({
      next: (res:any) => {
        const employees = res['data'].rows as EmployeeUpdate[]
        this.employees = employees.map(emp => {
          if(emp.image) {
            emp.image = `${environment.baseImageUrl}/${emp?.image}`
          } else {
            emp.image =  'https://bootdey.com/img/Content/avatar/avatar1.png'
          }
          return emp
        })
       
      },
      error:  (err: { status: string }) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == '401') {
            this.router.navigate(['/signin']);
          }
        }
      }
    })
    // this.repoService.getData(employeeByIdUrl).subscribe((res: any) => {
    //   (this.employees = res['data'].rows as EmployeeUpdate[]),
     
    //   console.log(this.employees);
    // },
    //   (err: { status: string }) => {
    //     if (err instanceof HttpErrorResponse) {
    //       if (err.status == '401') {
    //         this.router.navigate(['/signin']);
    //       }
    //     }
    //   });
    
  };

  
  isSubmitted(){
    this.employees.forEach((element:any) => {
      if(this.session?.[0]?.employee_kpis?.[0]?.givenby_id===this.super_id && this.session?.[0]?.employee_kpis?.[0]?.emp_id===this.employees[element]?.id){
          return true
      }
     return false
    })
   
  }

  private getActiveSession = () => {
    const sessionByUrl: string = `getkpi-super/`;
    this.repoService.getData(sessionByUrl).subscribe(
      (res: any) => {
       // console.log(res?.data);
        this.isshowing = true;
        this.session = res?.data['rows'] as Session[];
       // console.log(this.session)

        this.showKPIBtn =
          !this.session[0]?.is_completed && this.session[0]?.is_active
            ? true
            : false;
            
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
   
  };
  isshowing = false;

  openUpdateDialog(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: id,
      sessionId:this.session[0]?.id,
      title: 'Add Kpi',
    };

    this.dialog
      .open(AddKpiComponent, dialogConfig)
      
  }

  openKpiDetailsDialog(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      emp_id: id,
      givenby_id:this.super_id,
      sessionId:this.session[0]?.id,
      title: 'Add Kpi',
    };

    this.dialog
      .open(KpiDetailsComponent, dialogConfig)
      
  }

  redirectToEmployeeKpiDetails(id: string) {
    let kpiurl: string = `/supervisor/get-emp-details/${id}`;
    this.router.navigate([kpiurl]);
  }

  isActive(){
    if(this.session?.[0]?.is_active==1 && this.session?.[0]?.is_completed==0){
      return false
    }
    return true
  }
}
