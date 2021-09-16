import { Component, Input, OnInit } from '@angular/core';
import { RepoService } from 'src/app/service/repo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from '../../model/employee';
import { Location } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss']
})
export class EmployeeDeleteComponent implements OnInit {

  public employee!: Employee;
  constructor(private repository: RepoService, private router: Router,private location: Location,
    private activeRoute: ActivatedRoute,private active:NgbActiveModal) { }


    @Input() title: string | undefined;
    @Input() message: string | undefined;
    @Input() btnOkText: string | undefined;
    @Input() btnCancelText: string | undefined;


  ngOnInit(): void {
  // this.getEmployeeById();
  }



public redirectToEmployeeList = () => {
  this.router.navigate(['/admin/list']);
}


 public deleteEmployee(){
   console.log('52')
  
   this.active.close(true)

 }


public onCancle = () => {
   this.active.close(false);

}


}
