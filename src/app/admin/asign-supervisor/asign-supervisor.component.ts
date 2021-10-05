import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeUpdate, Supervisor } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';


interface supers {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-asign-supervisor',
  templateUrl: './asign-supervisor.component.html',
  styleUrls: ['./asign-supervisor.component.scss']
})
export class AsignSupervisorComponent implements OnInit {
  description:string;
  public employee!: Supervisor;
  public employeeForm!: FormGroup;
  Supervisors!: EmployeeUpdate[];


  constructor(
      private dialogRef: MatDialogRef<AsignSupervisorComponent>,
      private repoService: RepoService,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) data:any) {
      this.description = data.id;
     // console.log(this.description)
  }

  ngOnInit() {
      this.employeeForm = new FormGroup({
      sup_id: new FormControl('', [Validators.maxLength(60)]),
      supervisor_name: new FormControl(''),
    });
    this.getAllEmployees();
    this.getEmployeeById();
  }


  
  public getAllEmployees = () => {
    let employeeByIdUrl: string = `get-all/`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res:any) => {
        this.Supervisors = res['data'] as EmployeeUpdate[];
        this.employeeForm.patchValue(this.employee);
        this.pushValue();
      },
      (_error) => {
        //error massage
      }
    );
  };
  
  public pushValue() {
   // console.log(this.Supervisors)
    this.super.unshift({ value: '', viewValue: 'None' });
    this.Supervisors.filter((item)=>item.id!==this.description).forEach((item) => {
      this.super.push({
        viewValue: item.f_name,
        value: item.id.toString(),
      });
    });
   // console.log(this.super);
   
  }
  private getEmployeeById = () => {
    let employeeByIdUrl: string = `get-employee/${ this.description}`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res) => {
      //  console.log('res', res);
        this.employee = res as Supervisor;
        this.employeeForm.patchValue({
          ...this.employee,
          sup_id: this.employee.supervisor_id,
          supervisor_name: this.employee.supervisor_name,
        });
        // this.employeeForm.updateValueAndValidity();
        // console.log('this.employeeForm', this.employeeForm.value);
        // console.log(this.employee.supervisor_name);
      },
      (_error) => {
        //error massage
      }
    );
  };


  public updateemployee = (employeeFormValue: any) => {
    //  console.log(this.employeeForm.value);
    if (this.employeeForm.valid) {
      this.executeEmployeeUpdate(employeeFormValue);
    }
  };



  private executeEmployeeUpdate = (employeeFormValue: {
    supervisor_id: string;
    sup_id:string;
  }) => {
      (this.employee.supervisor_id = employeeFormValue.sup_id);

    let apiUrl = `add-super/${this.description}`;
    this.repoService.update(apiUrl,{supervisor_id: employeeFormValue.sup_id}).subscribe(
      (res) => {
       // console.log(res);
        this.router.navigate(['admin/list']);
      },
      (error) => {
        /* this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;*/
      }
    );
  };
  save() {
      this.dialogRef.close(this.employeeForm.value);
  }

  close() {
      this.dialogRef.close();
      this.router.navigate(['admin/list']);
  }



  super: supers[] = [];
}







