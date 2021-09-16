import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Count} from 'src/app/model/employee';
import { AuthService } from 'src/app/service/auth.service';
import { RepoService } from 'src/app/service/repo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

employeeList!: Count
  

  constructor(public _authService:AuthService, private repoService: RepoService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }


  public getAllEmployees = () => {
    let employeeByIdUrl: string = `total-employee/`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res:any) => {
        this.employeeList = res['data'] as Count;
        console.log(this.employeeList?.count)
      },
      (_error) => {
        //error massage
      }
    );
  };
}
