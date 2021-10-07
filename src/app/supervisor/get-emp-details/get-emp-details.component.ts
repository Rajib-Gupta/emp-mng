import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-get-emp-details',
  templateUrl: './get-emp-details.component.html',
  styleUrls: ['./get-emp-details.component.scss']
})
export class GetEmpDetailsComponent implements OnInit {

  url:any
  public employee: Employee | undefined;
  constructor(private repository: RepoService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmployeeById()
  }

  
private getEmployeeById = () => {
  const employeeId: string = this.activeRoute.snapshot.params['id'];
  const employeeByIdUrl: string = `get-employee/${employeeId}`;
  this.repository.getData(employeeByIdUrl)
    .subscribe((res:any) => {
      console.log(res.data)
      this.employee = res.data as Employee;
      if(this.employee?.image) {
        setTimeout(() => {
          this.url =`${environment.baseImageUrl}/${this.employee?.image}`
        }, 0);
  
      }
      else{
        this.url = 'https://bootdey.com/img/Content/avatar/avatar1.png';
      }
     



    },
    (error) => {
      //this.errorHandler.handleError(error);
      //this.errorMessage = this.errorHandler.errorMessage;
    })
}



}
