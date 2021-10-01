import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addKpi } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { InteractionService } from 'src/app/service/interaction.service';

@Component({
  selector: 'app-add-own-kpi',
  templateUrl: './add-own-kpi.component.html',
  styleUrls: ['./add-own-kpi.component.scss']
})
export class AddOwnKpiComponent implements OnInit {

  public sessionForm!: FormGroup;
  emp_id:string
  session_id:string
  constructor(  private location: Location,
    private router: Router,
    private hotTost: HotToastService,
    public dialogRef: MatDialogRef<AddOwnKpiComponent>,
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
      this.isSubmitted=true;
      this.executeKpiAdd(this.sessionForm.value);
    }
    this.dialogRef.close();
   
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
      (res:any) => {
        console.log(res);
        this.isSubmitted=false;
        this.hotTost.success("Successfully Added.");
      },
      (error) => {
        this.isSubmitted=false;
        this.toastr.error("Please check again!",error.message)
     
      }
    );
  };


 isSubmitted=false;

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
