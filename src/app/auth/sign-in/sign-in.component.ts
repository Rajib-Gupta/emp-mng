
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  
  Form!: FormGroup;
  loginMode: boolean = true;

  loginData!: {};

  winMassage: string = ' ';
  error: string = ' ';

  constructor(  private _authservice: AuthService,
    private routes: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      // role: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(1),
      // ]),
    });
  }

  
  handlrmsg() {
    if (this.winMassage) {
      this.toastr.success(this.winMassage);
    }
    if (this.error) {
      this.toastr.error(this.error);
    }
  }

  signIn() {
    if (this.Form.valid) {
      const email = this.Form.value.email;
      const password = this.Form.value.password;
      // const role = this.Form.value.role;
      if (this.loginMode) {
        this._authservice.master(email, password).subscribe(
          (res) => {
            localStorage.clear();
            console.log(res);
            if(res.data){
              if (res.data.role ==="1") {
                // if (role == 1) {
                  localStorage.setItem('data', JSON.stringify(res.data));
                  this.toastr.success('You have successfully login!', `Welcome ${res.data.f_name} To Admin Dashboard`);
                  localStorage.setItem('token', res.token);
                  this.routes.navigate(['admin/dashboard']);
                } else {
                  this.toastr.error('Please cheack email and password!', 'Opps!');
                }          
            }
            else{
              this.toastr.error('Please cheack email and password!', 'Opps!');
            }
          },

          (err) => {
            this.toastr.error('Please cheack email and password!', 'Opps!');
           // console.log(err);
            this.routes.navigate(['/signin']);
          }
        );
      }
      this.routes.navigate(['/signin']);
    }
  }

  onmodeSwitch() {
    this.loginMode = !this.loginMode;
  }


}
