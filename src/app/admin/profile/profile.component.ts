import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Employee } from 'src/app/model/employee';
import { InteractionService } from 'src/app/service/interaction.service';
import { RepoService } from 'src/app/service/repo.service';
import { environment } from 'src/environments/environment';
import { ResetPasswordAdminComponent } from '../reset-password-admin/reset-password-admin.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  employee!: Employee;

  url: any;

  images!: any;
  constructor(
    private repoService: RepoService,
    private router: Router,
    private interaction: InteractionService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private hotTost: HotToastService
  ) {}

  ngOnInit(): void {
    this.getEmployeeById();
  }

  _name = JSON.parse(localStorage.getItem('data') as string);

  admin_id = this._name?.id;
  admin_fname = this._name?.f_name;
  admin_lname = this._name?.l_name;
  admin_email = this._name?.email;
  admin_phone = this._name?.phone;
  admin_desig = this._name?.desig;

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const ext = file.type.split('/')[1];
      if (ext.match(/(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|JFIF)/gi)) {
        this.images = file;
        const formData = new FormData();
        formData.append('file', this.images);
        let apiUrl = `upload-image/${this.admin_id}`;
        this.repoService.upload(apiUrl, formData).subscribe((res) => {
          this.getEmployeeById();
          // console.log(res);
        }),
          (error: any) => {
            console.log(error);
            this.hotTost.error(error.message);
          };
      } else {
        this.hotTost.warning('Please select a valid  image file');
      }
    }
  }

  private getEmployeeById = () => {
    const employeeId: string = this.admin_id;
    const employeeByIdUrl: string = `get-employee/${employeeId}`;
    this.repoService.getData(employeeByIdUrl).subscribe(
      (res: any) => {
        // console.log(res.data);
        this.employee = res.data as Employee;

        if(this.employee?.image) {

          setTimeout(() => {
            this.url = `${environment.baseImageUrl}/${this.employee?.image}`;
          }, 0);
    
        }
        else{
          this.url = 'https://bootdey.com/img/Content/avatar/avatar1.png';
        }

        this.interaction.setUser(res.data);
      },
      (error) => {
        //this.errorHandler.handleError(error);
        //this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  };

  openPasswordResetDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.admin_id,
      title: 'Rest your Password',
    };

    this.dialog.open(ResetPasswordAdminComponent, dialogConfig);
  }
}
