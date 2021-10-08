import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { kpiDetails } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';

@Component({
  selector: 'app-kpi-details',
  templateUrl: './kpi-details.component.html',
  styleUrls: ['./kpi-details.component.scss'],
})
export class KpiDetailsHistoryComponent implements OnInit {
  public employee:any| undefined;
  kpi_details_emp_id: any;
  kpi_details_givenby_id: any;
  kpi_details_session_id: any;
  constructor(
    public dialogRef: MatDialogRef<KpiDetailsHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private repoService: RepoService,
    private hotTost: HotToastService,
    private router: Router
  ) {
    this.kpi_details_emp_id = data.emp_id;
    this.kpi_details_givenby_id = data.givenby_id;
    this.kpi_details_session_id = data.kpiSessionId;
  }

  ngOnInit(): void {
    this.getKpiById();
  }

  private getKpiById = () => {
    const employeeId: string = this.kpi_details_emp_id;
    const givenby_id:string=this.kpi_details_givenby_id
    const kpiSessionId:string= this.kpi_details_session_id
    const employeeByIdUrl: string = `get-kpidetails-foradmin/${employeeId}/${givenby_id}/${kpiSessionId}`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res: any) => {
        this.employee = res.kpiData[0];
        console.log(this.employee);
        this.hotTost.success(res.message);
      },
      (error) => {
        this.hotTost.error('Invalid employee!');
      }
    );
  };

  onBack() {
    this.dialogRef.close();
  }
}
