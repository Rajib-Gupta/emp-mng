import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';
import { passwordReset } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';

@Component({
  selector: 'app-password-reset-emp',
  templateUrl: './password-reset-emp.component.html',
  styleUrls: ['./password-reset-emp.component.scss']
})
export class PasswordResetEmpComponent implements OnInit {

  public employeeForm!: FormGroup;
  emp_id:string
   constructor( 
     private router: Router,
     private hotTost: HotToastService,
     public dialogRef: MatDialogRef<PasswordResetEmpComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
   
     private repository: RepoService,
     private toastr:ToastrService) {
       this.emp_id = data.id;
      
      }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(6),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(6),
      ]),
     
    });
  
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };

  close() {
    this.dialogRef.close();
  }
  updatepassword(){
    if (this.employeeForm.valid) {
      this.passwordReset(this.employeeForm.value);
    }
   
  }

  private passwordReset = (employeeFormValue: {
    password:string;
    newPassword:string
  }) => {
    let password: passwordReset = {
     password:employeeFormValue.password,
     newPassword:employeeFormValue.newPassword
     
    };

    let apiUrl = `password-reset/${this.emp_id}`;
    this.repository.addKpi(apiUrl, password).subscribe(
      (res) => {
       // console.log(res);
      
        this.hotTost.success(
          'You have successfully Updated Password',
         
        );
        this.dialogRef.close();
      },
      (error) => {
        this.hotTost.error("Please check again!",error.message)
     
      }
    );
  };
}
