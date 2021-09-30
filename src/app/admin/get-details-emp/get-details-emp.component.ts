import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { RepoService } from 'src/app/service/repo.service';

@Component({
  selector: 'app-get-details-emp',
  templateUrl: './get-details-emp.component.html',
  styleUrls: ['./get-details-emp.component.scss']
})
export class GetDetailsEmpComponent implements OnInit {
  public employee: Employee | undefined;
  constructor(private repoService: RepoService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getEmployeeById()
  }

  private getEmployeeById = () => {
    const employeeId: string = this.activeRoute.snapshot.params['id'];
    const employeeByIdUrl: string = `get-employee/${employeeId}`;
    this.repoService.getData(employeeByIdUrl)
      .subscribe((res:any) => {
        console.log(res.data)
        this.employee = res.data as Employee;
  
  
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      })
  }
}
