import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepoService } from 'src/app/service/repo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeUpdate } from '../../model/employee';
import { Location } from '@angular/common';

interface role {
  value: string;
  viewValue: string;
}

interface status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss'],
})
export class EmployeeUpdateComponent implements OnInit {
  // public errorMessage: string = '';
  public employee!: EmployeeUpdate;
  public employeeForm!: FormGroup;

  constructor(
    private location: Location,
    private repository: RepoService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      emp_id: new FormControl(''),
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
      password: new FormControl('', [
        Validators.maxLength(100),
        Validators.minLength(6),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      role: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      status: new FormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]),
      dob: new FormControl('', [Validators.required]),
      doj: new FormControl('', [Validators.required]),
      dpt: new FormControl('', [Validators.required]),
      desig: new FormControl('', [Validators.required]),
    });
    this.getEmployeeById();
  }

  public onCancel = () => {
    this.location.back();
  };

  private getEmployeeById = () => {
    let employeeId: string = this.activeRoute.snapshot.params['id'];
    let employeeByIdUrl: string = `get-employee/${employeeId}`;
    this.repository.getData(employeeByIdUrl).subscribe(
      (res: any) => {
        // console.log('res', res);
        this.employee = res['data'] as EmployeeUpdate;
        this.employeeForm.patchValue({
          ...this.employee,
          role: this.employee.role,
        });
        this.employeeForm.updateValueAndValidity();
        // console.log('this.employeeForm', this.employeeForm.value);
      },
      (_error) => {
        //error massage
      }
    );
  };

  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };

  public redirectToEmployeeList = () => {
    this.router.navigate(['/admin']);
  };

  public updateemployee = (employeeFormValue: any) => {
    //  console.log(this.employeeForm.value);
    if (this.employeeForm.valid) {
      this.executeEmployeeUpdate(employeeFormValue);
    }
  };
  // put value into form
  private executeEmployeeUpdate = (employeeFormValue: {
    emp_id: string;
    f_name: string;
    l_name: string;
    email: string;
    phone: number;
    role: string;
    status: string;
    dob: Date;
    doj: Date;
    dpt: string;
    desig: string;
    password: string;
  }) => {
    (this.employee.emp_id = employeeFormValue.emp_id),
      (this.employee.f_name = employeeFormValue.f_name),
      (this.employee.l_name = employeeFormValue.l_name),
      (this.employee.email = employeeFormValue.email),
      (this.employee.password = employeeFormValue.password),
      (this.employee.phone = employeeFormValue.phone),
      (this.employee.role = employeeFormValue.role),
      (this.employee.status = employeeFormValue.status),
      (this.employee.dob = employeeFormValue.dob),
      (this.employee.doj = employeeFormValue.doj),
      (this.employee.dpt = employeeFormValue.dpt),
      (this.employee.desig = employeeFormValue.desig);

    let apiUrl = `update/${this.employee.id}`;
    console.log(this.employee.id);
    this.repository.update(apiUrl, this.employee).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['admin/list']);
      },
      (error) => {
        /* this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;*/
      }
    );
  };

  employee_role: role[] = [
    { value: '1', viewValue: 'Admin' },
    { value: '2', viewValue: 'Supervisor' },
    { value: '3', viewValue: 'Employee' },
  ];
  empStatus: status[] = [
    { value: '0', viewValue: 'Inactive' },
    { value: '1', viewValue: 'Active' },
  ];
}
