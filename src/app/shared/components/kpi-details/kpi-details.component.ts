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
export class KpiDetailsComponent implements OnInit {
  public employee:any| undefined;
  kpi_details_emp_id: any;
  kpi_details_givenby_id: any;
  constructor(
    public dialogRef: MatDialogRef<KpiDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private repoService: RepoService,
    private hotTost: HotToastService,
    private router: Router
  ) {
    this.kpi_details_emp_id = data.emp_id;
    this.kpi_details_givenby_id = data.givenby_id;
    // console.log(this.kpi_details_id);
  }

  ngOnInit(): void {
    this.getKpiById();
  }

  private getKpiById = () => {
    const employeeId: string = this.kpi_details_emp_id;
    const givenById: string = this.kpi_details_givenby_id;
    const employeeByIdUrl: string = `get-kpi-data/${employeeId}/${givenById}`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res: any) => {
        this.employee = res.kpiData[0];
         //console.log(this.employee);
       
      },
      (error) => {
        this.hotTost.error(error.error.message);
      }
    );
  };

  onBack() {
    this.dialogRef.close();
  }
}
