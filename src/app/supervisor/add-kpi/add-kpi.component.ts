import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addKpi } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-kpi',
  templateUrl: './add-kpi.component.html',
  styleUrls: ['./add-kpi.component.scss']
})

export class AddKpiComponent implements OnInit {
  public sessionForm!: FormGroup;
  emp_id:string
  session_id:string
  constructor(  private location: Location,
    private router: Router,
    public dialogRef: MatDialogRef<AddKpiComponent>,
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
     this.location.back();
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
    const _super= JSON.parse(localStorage.getItem("data") as string);
    let kpi: addKpi = {
      supervisor_id: _super.id,
      givenby_id: _super.id,
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
        console.log(res);
        this.router.navigate(['/supervisor/employee-under'])
         this.location.back();
      },
      (error) => {
        this.toastr.error("Please check again!",error.message)
        this.location.back();
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
