import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Count, Employee, Session } from 'src/app/model/employee';
import { AuthService } from 'src/app/service/auth.service';
import { RepoService } from 'src/app/service/repo.service';
import { KpiSessionComponent } from '../kpi-session/kpi-session.component';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ManageKpiSessionComponent } from '../manage-kpi-session/manage-kpi-session.component';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { EmpDeleteService } from 'src/app/service/emp-delete.service';
import { InteractionService } from 'src/app/service/interaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public displayedColumns = [
    'Year',
    'session',
    'is_active',
    'is_completed',
    'manage',
    'deleteSession'
  ];
  public dataSource = new MatTableDataSource<Session>();
  employeeList!: Count;
  _name: any;
  employee!: Employee;
  admin_id: any;
  url:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public _authService: AuthService,
    private repoService: RepoService,
    private router: Router,
    private dialog: MatDialog,
    private employeeDelete:EmpDeleteService,
    private interaction: InteractionService
  ) {}

  get openDialogs () {
   return  this.dialog.openDialogs.length
  }

  ngOnInit(): void {
    this.getAllKpiSession();
    this.getAllEmployees();
    this.dialog.afterAllClosed.subscribe((modalCloseModal) => {
     // console.log(`Closing modal`, modalCloseModal);
      this.getAllKpiSession();
    });

    this._name = JSON.parse(localStorage.getItem('data') as string);

    this.admin_id = this._name?.id;


    this.interaction.user$.subscribe((data: any) => {
     // console.log('data', data);
      this.employee = data as Employee;
     // console.log(data);
      setTimeout(() => {
        this.url = `${environment.baseImageUrl}/${data?.image}`;
      }, 0);
  })
}

  public getAllKpiSession = () => {
    this.repoService.getData('kpi-details/').subscribe((res: any) => {
     // console.warn(res);
      (this.dataSource.data = res['data'].rows as Session[]),
        (err: { status: string }) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == '401') {
              this.router.navigate(['/signin']);
            }
          }
        };
    });
  };

  public getAllEmployees = () => {
    let employeeByIdUrl: string = `total-employee/`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res: any) => {
        this.employeeList = res['data'] as Count;
      //  console.log(this.employeeList?.count);
      },
      (_error) => {
        //error massage
      }
    );
  };


  
  public delete = (emp_id: string) => {
    //console.log(element);
    this.employeeDelete
      .confirm('Please confirm..', 'Do you really want to Delete ?')
      .then((confirmed) => {
      //  console.log(`[confirmed]`, confirmed);
        if (!confirmed) {
          return;
        }
        const deleteUrl: string = `delete-session/${emp_id}`;
        this.repoService.delete(deleteUrl).subscribe(
          (res) => {
           // console.log(res);
             this.getAllKpiSession();
          },
          (error) => {
           // console.log(error);
          }
        );
      });
  };

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Add New Kpi Session',
    };

    
    // this.dialog.open(KpiSessionComponent, dialogConfig);

    // this.dialog.afterAllClosed.subscribe((modalCloseModal) => {
    //   console.log(`Closing modal`, modalCloseModal);
    //   this.getAllKpiSession();
    // });
    const dialogRef = this.dialog.open(KpiSessionComponent, dialogConfig);
  }

  opeUpdateDialog(session_id: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: session_id,
      title: 'Update Kpi session',
    };

    // this.dialog.open(ManageKpiSessionComponent, dialogConfig);

    const dialogRef = this.dialog.open(ManageKpiSessionComponent, dialogConfig);
  }

  private getEmployeeById = () => {
    const employeeId = this.admin_id;
    const employeeByIdUrl: string = `get-employee/${employeeId}`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res: any) => {
       //console.log(res.data);
        this.employee = res.data as Employee;
        this.url = `${environment.baseImageUrl}/${this.employee?.image}`;
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };

  
  ngAfterViewInit(): void {
 
    this.dataSource.paginator = this.paginator;
  }
}
