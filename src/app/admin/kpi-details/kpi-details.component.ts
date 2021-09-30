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
  public employee: kpiDetails | undefined;
  kpi_details_id: any;
  constructor(
    public dialogRef: MatDialogRef<KpiDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private repoService: RepoService,
    private hotTost: HotToastService,
    private router: Router
  ) {
    this.kpi_details_id = data.id;
    console.log(this.kpi_details_id);
  }

  ngOnInit(): void {
    this.getKpiById();
  }

  private getKpiById = () => {
    const employeeId: string = this.kpi_details_id;
    const employeeByIdUrl: string = `get-kpi-details/${employeeId}`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res: any) => {
        this.employee = res.data.kpi_details as kpiDetails;
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
