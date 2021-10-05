import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';
import { RepoService } from 'src/app/service/repo.service';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { Employee } from '../../model/employee';


interface role {
  value: string;
  viewValue: string;
}

interface status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  public showPassword: boolean | undefined;
  count:any;

  public employeeForm!: FormGroup;
  constructor( private location: Location,
    private repository: RepoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      employee_id:new FormControl('',Validators.required),
      f_name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.maxLength(60),
      ]),
      l_name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.maxLength(60),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._]+(@ogmaconceptions.com)$'),
        Validators.maxLength(100),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      role: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      status: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      dob:new FormControl('',[Validators.required]),
      doj:new FormControl('',[Validators.required]),
      dpt:new FormControl('',[Validators.required]),
      desig:new FormControl('',[Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(6),
      ]),
      sup_name: new FormControl('', [
        Validators.maxLength(60),
      ]),
    });
  }


  
  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };

  
  public onCancel = () => {
    this.location.back();
  };


  public addemployee = (employeeFormValue: any) => {
    if (this.employeeForm.valid) {
      //console.log(this.employeeForm.value);
      this.executeEmployeeAdd(employeeFormValue);
    }
  };

  isdisable(){
    if(this.employeeForm.value.role===1){
     return true
    }
    return false
  }



  private executeEmployeeAdd = (employeeFormValue: {
    employee_id:string;
    f_name: string;
    l_name: string;
    email: string;
    phone: number;
    role: string;
    status: string;
    dob:Date;
    doj:Date;
    dpt:string;
    desig:string;
    password: string;
    // sup_name: string;
  }) => {
    let employee: Employee = {
      emp_id: employeeFormValue.employee_id,
      f_name: employeeFormValue.f_name,
      l_name: employeeFormValue.l_name,
      email: employeeFormValue.email,
      phone: employeeFormValue.phone,
      role: employeeFormValue.role,
      status: employeeFormValue.status,
      dob: employeeFormValue.dob,
      doj: employeeFormValue.doj,
      dpt: employeeFormValue.dpt,
      desig: employeeFormValue.desig,
      password: employeeFormValue.password,
      
    };

    let emailCheck= 'emailValidation/';
    this.repository.emailCheck(emailCheck, {"email":employee.email}).subscribe(
      (res) => {
        this.count = res;
        if(this.count.cnt>0){
          this.toastr.error('Wrong input!', 'Email is already exists!');
        }
        else{
          let apiUrl = 'create/';
          this.repository.create(apiUrl, employee).subscribe(
            (res) => {
              if (res)// console.log(res);
              this.location.back();
            },
            (error) => {
              this.toastr.error('Wrong input!', 'Email is already exists!');
              //this.location.back();
            });
      }
          
        
      })
 
    }

    
  employee: role[] = [
    { value: '1', viewValue: 'Admin' },
    { value: '2', viewValue: 'Supervisor' },
    { value: '3', viewValue: 'Employee' },
  ];
  empStatus: status[] = [
    { value: '0', viewValue: 'Inactive' },
    { value: '1', viewValue: 'Active' },
   
  ];
  
}
