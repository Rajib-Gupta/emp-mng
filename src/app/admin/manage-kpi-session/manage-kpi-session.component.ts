import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpdateSession } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HotToastService } from '@ngneat/hot-toast';
interface complete {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-manage-kpi-session',
  templateUrl: './manage-kpi-session.component.html',
  styleUrls: ['./manage-kpi-session.component.scss'],
})
export class ManageKpiSessionComponent implements OnInit {
  session_id: string;
  public sessionForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ManageKpiSessionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private repoService: RepoService,
    private toastr: ToastrService,
    private hotTost: HotToastService,
    private router: Router,
    private location: Location
  ) {
    this.session_id = data.id;
    console.log(this.session_id);
  }

  ngOnInit(): void {
    this.sessionForm = new FormGroup({
      is_completed: new FormControl(''),
    });

   
  }

  public sessionUpdate = (employeeFormValue: any) => {
    //  console.log(this.employeeForm.value);
    if (this.sessionForm.valid) {
      this.executeSessionUpdate(employeeFormValue);
    }
    this.dialogRef.close();
   
  };
  private executeSessionUpdate = (sessionFormValue: {
    is_completed: number;
  }) => {
    let employee: UpdateSession = {
      is_completed: sessionFormValue.is_completed,
    };

    let apiUrl = `update-kpi/${this.session_id}`;
    this.repoService.update(apiUrl, employee).subscribe(
      (res) => {
      
       this.hotTost.success('You have successfully Updated Session!');
      },
      (error) => {
        // this.toastr.error('Wrong input!', 'Email is already exists!');
        //this.location.back();
      }
    );
  };

  sessionClose() {
    this.dialogRef.close();
  }

  is_complete: complete[] = [
    { value: 1, viewValue: 'Yes' },
    { value: 0, viewValue: 'No' },
  ];
}
