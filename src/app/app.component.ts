import { Component, OnInit } from '@angular/core';
import { InteractionService } from './service/interaction.service';
import { RepoService } from './service/repo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Employee Management';

  employee: any;
  constructor(
    private readonly repoService: RepoService,
    private readonly interaction: InteractionService
  ) {}

  ngOnInit() {

    this.fetchEmployeeById()
    this.handleUserRefresh();
   
  }

  handleUserRefresh() {
    this.interaction.refreshUser$.subscribe(shouldRefresh => {
      if(shouldRefresh) this.fetchEmployeeById()
    })
  }
  
  fetchEmployeeById() {
    const employee = JSON.parse(localStorage.getItem('data') as string);

    if (employee) {
      const employeeByIdUrl: string = `get-employee/${employee.id}`;
      this.repoService.getData(employeeByIdUrl).subscribe(
        (res: any) => {
          this.interaction.setUser(res.data);
        },
        (error) => {
          console.error('error',error.message)
          //this.errorHandler.handleError(error);
          //this.errorMessage = this.errorHandler.errorMessage;
        }
      );
    }
  }
}
