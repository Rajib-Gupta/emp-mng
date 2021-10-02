// import { EmployeeDeleteService } from '../../service/employee-delete.service';
import { Admin } from '../../model/employee';
import { RepoService } from './../../service/repo.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { Employee } from '../../model/employee';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AsignSupervisorComponent } from '../asign-supervisor/asign-supervisor.component';
import { EmpDeleteService} from '../../service/emp-delete.service'
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  public displayedColumns = [
    'status',
    'employee_id',
    'f_name',
    'l_name',
   // 'email',
   // 'phone',
   // 'dob',
   // 'doj',
    'sup_id',
    'role',
    'dpt',
    'desig',
    'details',
    "asign-sup",
    'update',
    'delete'
  ];
  public dataSource = new MatTableDataSource<Admin>();
  public employee!: Employee;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private repoService: RepoService,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private employeeDelete:EmpDeleteService
   
  ) {}
  // @ViewChild("box") box:ElementRef | undefined

  ngOnInit() {
    this.getAllEmployees();
  }

  public getAllEmployees = () => {
    this.repoService.getData('get-all/').subscribe((res:any) => {
      // console.warn(res);
      (this.dataSource.data = res['data'] as Admin[]),
        (err: { status: string }) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == '401') {
              this.router.navigate(['/signin']);
            }
          }
       
        };
    });
  };

  
  public redirectToUpdate = (emp_id: string) => {
    const updateUrl: string = `/admin/update/${emp_id}`;
    this.router.navigate([updateUrl]);
  };

//  public redirectToSup=(emp_id:string)=>{
//    const supUrl:string=`/admin/asign-supervisor/${emp_id}`
//    this.router.navigate([supUrl]);
//  }


 openDialog(emp_id:any) {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  
  dialogConfig.data = {
    id: emp_id,
    title: 'Asign Supervisor'
};

  this.dialog.open(AsignSupervisorComponent, dialogConfig);

  

  }
    


  public delete = (emp_id: string) => {
    //console.log(element);
    this.employeeDelete
      .confirm('Please confirm..', 'Do you really want to Delete ?')
      .then((confirmed) => {
        console.log(`[confirmed]`, confirmed);
        if (!confirmed) {
          return;
        }
        const deleteUrl: string = `delete-emp/${emp_id}`;
        this.repoService.delete(deleteUrl).subscribe(
          (res) => {
            console.log(res);
             this.getAllEmployees();
          },
          (error) => {
            console.log(error);
          }
        );
      });
  };

  // public redirectToDownload() {
  //   this.repoService.getDownload('download-data/').subscribe((res) => {
  //     let downloadLink = document.createElement('a');
  //     let blob = res.body as Blob;
  //     downloadLink.style.display = 'hidden';

  //     console.log('blob', blob);
  //     let blobData = window.URL.createObjectURL(
  //       new Blob([blob], { type: blob.type })
  //     );
  //     downloadLink.href = blobData;
  //     downloadLink.setAttribute('download', 'Kpi.xlsx');
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();

  //     setTimeout(() => {
  //       window.URL.revokeObjectURL(blobData);
  //       downloadLink.remove();
  //     }, 350);

  //     console.warn(res);
  //   });
  // }


  redirectToDetails(id:string){
    let kpiurl: string = `/admin/get-details/${id}`;
    this.router.navigate([kpiurl]);
  }

  applyFilter(event: any) {
    const filterQuery = event.target.value.trim().toLowerCase(); // Remove whitespace
    // filterValue = filterValue.value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterQuery;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}


