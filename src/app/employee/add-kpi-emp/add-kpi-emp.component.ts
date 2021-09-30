import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addKpi } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-kpi-emp',
  templateUrl: './add-kpi-emp.component.html',
  styleUrls: ['./add-kpi-emp.component.scss']
})
export class AddKpiEmpComponent implements OnInit {
  public sessionForm!: FormGroup;
  emp_id:string
  session_id:string
  constructor(   private location: Location,
    private router: Router,
    public dialogRef: MatDialogRef<AddKpiEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  
    private repository: RepoService,
    private toastr:ToastrService) {
      this.emp_id = data.id;
      this.session_id=data.sessionId;
     
     }

  ngOnInit(): void {
    this.sessionForm=new FormGroup({
      availability: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      ontime: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      punctuality: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      regularity: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      timetorepair: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      criticalproblemsolving: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      clienthandling: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      innovative: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      teamPlayer: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      dependibility: new FormControl(0, [
        Validators.required,
        Validators.maxLength(10),
      ]),
  

     
    })
    
    
  }



  public addKpi =() => {
    if (this.sessionForm.valid) {
      this.executeKpiAdd(this.sessionForm.value);
    }
  
  };
  private executeKpiAdd = (sessionFormValue: {
    availability: number;
    ontime: number;
    punctuality: number;
    regularity: number;
    timetorepair: number;
    criticalproblemsolving: number;
    clienthandling: number;
    innovative: number;
    teamPlayer: number;
    dependibility: number;
  }) => {
    const _employee= JSON.parse(localStorage.getItem("data") as string);
    let kpi: addKpi = {
      supervisor_id: _employee.supervisor_id,
      givenby_id: _employee.id,
      kpiSessionId:this.session_id,
     kpi_details:{
      availability: sessionFormValue.availability,
      ontime: sessionFormValue.ontime,
      punctuality: sessionFormValue.punctuality,
      regularity: sessionFormValue.regularity,
      timetorepair: sessionFormValue.timetorepair,
      criticalproblemsolving: sessionFormValue.criticalproblemsolving,
      clienthandling: sessionFormValue.clienthandling,
      innovative: sessionFormValue.innovative,
      teamPlayer: sessionFormValue.teamPlayer,
      dependibility: sessionFormValue.dependibility,

      }
     
    };

    console.log(kpi)
    let apiUrl = `add-kpi/${this.emp_id}`;
    this.repository.addKpi(apiUrl, kpi).subscribe(
      (res) => {
       // console.log(res);
        this.router.navigate(['/employee/emp-profile'])
        this.toastr.success(
          'You have successfully Added Kpi!')
      },
      (error) => {
        this.toastr.error("Please check again!",error.message)
      
      }
    );
  };

  
  close() {
    this.dialogRef.close();
  }
  
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;

}
}