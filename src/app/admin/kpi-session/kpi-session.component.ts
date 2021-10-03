import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Session } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';

interface year {
  value: number;
  viewValue: number;
}

interface complete {
  value: number;
  viewValue: string;
}

interface allow {
  value: number;
  viewValue: string;
}

interface session {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-kpi-session',
  templateUrl: './kpi-session.component.html',
  styleUrls: ['./kpi-session.component.scss'],
})
export class KpiSessionComponent implements OnInit {
  public round!: Session;
  public sessionForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KpiSessionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private repoService: RepoService,
    private router: Router,
    private hotTost: HotToastService,
  ) {}

  ngOnInit(): void {
    this.sessionForm = new FormGroup({
      session: new FormControl('',[Validators.required]),
      year: new FormControl('',[Validators.required]),
      is_active: new FormControl(1),
      is_completed: new FormControl(0),
    });

    this.pushValue();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.sessionForm.controls[controlName].hasError(errorName);
  };

  public pushValue() {
    var year = Number(new Date().getFullYear());
    const yearsInFuture = 7;
    for (let i = 0; i < yearsInFuture; i++) {
      this.sessionYear.push({ value: year, viewValue: year });
      year++;
    }
    console.log(this.sessionYear);
  }

  public sessionUpdate = (employeeFormValue: any) => {
    //  console.log(this.employeeForm.value);
    if (this.sessionForm.valid) {
      this.executeSessionUpdate(employeeFormValue);
    }
    this.dialogRef.close();
  };
  private executeSessionUpdate = (sessionFormValue: {
    session: number;
    year: number;
    is_completed: number;
    is_active: number;
  }) => {
    let employee: Session = {
      session: sessionFormValue.session,
      year: Number(sessionFormValue.year),
      is_completed: sessionFormValue.is_completed,
      is_active: sessionFormValue.is_active,
    };

    let apiUrl = 'add-session/';
    this.repoService.create(apiUrl, employee).subscribe(
      (res:any) => {
        if (res){
          //console.log(res);
          this.hotTost.success(res.message);
        }
      },
      (error:any) => {
        this.hotTost.warning(error.message);
      }
    );
  };

  close() {
    this.dialogRef.close();
  }

  sessionYear: year[] = [];

  session: session[] = [
    { value: 1, viewValue: 'Jan-April' },
    { value: 2, viewValue: 'May-August' },
    { value: 3, viewValue: 'Sep-Dec' },
  ];

  is_complete: complete[] = [
    { value: 1, viewValue: 'Yes' },
    { value: 0, viewValue: 'No' },
  ];

  is_active: allow[] = [
    { value: 1, viewValue: 'Yes' },
    { value: 0, viewValue: 'No' },
  ];
}
