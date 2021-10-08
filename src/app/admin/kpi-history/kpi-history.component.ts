import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Admin, kpiHistory, Session } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import {KpiDetailsHistoryComponent } from '../kpi-details/kpi-details.component';
import { KpiDetailsComponent } from 'src/app/shared/components/kpi-details/kpi-details.component';

interface year {
  value: number;
  viewValue: number;
}

interface session {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-kpi-history',
  templateUrl: './kpi-history.component.html',
  styleUrls: ['./kpi-history.component.scss'],
})
export class KpiHistoryComponent implements OnInit {
  kpiDetails!: kpiHistory;
  kpi_session!: Session;

  @ViewChild('TABLE')
  table!: ElementRef;
  public displayedColumns = [
    'f_name',
    'sup_id',
    'year',
    'session',
    'emp_kpi',
    'super_kpi',
    'total_kpi',
    'sup_kpi_details',
    'emp_kpi_details',
  ];
  public dataSource = new MatTableDataSource<kpiHistory>();
  public round!: Session;
  public sessionForm!: FormGroup;
  constructor(private repoService: RepoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.sessionForm = new FormGroup({
      session: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      is_active: new FormControl(''),
      is_completed: new FormControl(''),
    });

    this.pushValue();
  }

  exportAsExcel() {
    const rows = this.dataSource.data.map(row => {
      const _row = JSON.parse(JSON.stringify(row))

      delete _row.sup_kpi_details;
      delete _row.emp_kpi_details;
      delete _row.givenby_id;
       delete _row.emp_id ;
       delete _row.id;
      return _row;
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows); //converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Kpi_history.xlsx');
  }



  showbutton(){
    if(this.dataSource.data.length){
      return false
    }
    return true
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
  };
  private executeSessionUpdate = (sessionFormValue: {
    session: number;
    year: number;
  }) => {
    let employee: Session = {
      session: sessionFormValue.session,
      year: Number(sessionFormValue.year),
    };

    let apiUrl = `get-kpi-details-session/${employee.year}/${employee.session}`;
    this.repoService.getData(apiUrl).subscribe(
      (res: any) => {
        console.log(res.data);
        this.dataSource.data = res.data as kpiHistory[];
        console.log(this.dataSource.data);
      },
      (error) => {
        // this.toastr.error('Wrong input!', 'Email is already exists!');
        //this.location.back();
      }
    );
  };

  applyFilter(event: any) {
    const filterQuery = event.target.value.trim().toLowerCase(); // Remove whitespace
    // filterValue = filterValue.value.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterQuery;
  }

  sessionYear: year[] = [];

  session: session[] = [
    { value: 1, viewValue: 'Jan-April' },
    { value: 2, viewValue: 'May-August' },
    { value: 3, viewValue: 'Sep-Dec' },
  ];

  openSupKpiDialog(sup_id: any,emp_id:any,kpiSessionId:any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      emp_id: emp_id,
      givenby_id:sup_id,
      kpiSessionId:kpiSessionId,
      title: 'Add New Kpi Session',
    };

    const dialogRef = this.dialog.open(KpiDetailsHistoryComponent, dialogConfig);
  }

  openEmpKpiDialog(id: any,kpiSessionId:any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      emp_id: id,
      givenby_id:id,
      kpiSessionId:kpiSessionId,
      title: 'Add New Kpi Session',
    };

    const dialogRef = this.dialog.open(KpiDetailsHistoryComponent, dialogConfig);
  }
}
