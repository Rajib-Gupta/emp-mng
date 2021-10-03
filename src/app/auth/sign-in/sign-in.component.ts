import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InteractionService } from 'src/app/service/interaction.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  Form!: FormGroup;
  loginMode: boolean = true;

  loginData!: {};

  winMassage: string = ' ';
  error: string = ' ';

  constructor(
    private _authservice: AuthService,
    private routes: Router,
    private toastr: ToastrService,
    private interaction:InteractionService,
    private hotTost: HotToastService,
  ) {}

  ngOnInit(): void {
    this.Form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,
        Validators.pattern('[a-zA-Z0-9._]+(@ogmaconceptions.com)$'),]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
     
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return  this.Form.controls[controlName].hasError(errorName);
  };
  
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
      this.interaction.setUser(null)
      const email = this.Form.value.email;
      const password = this.Form.value.password;
      // const role = this.Form.value.role;
      if (this.loginMode) {
        this._authservice.master(email, password).subscribe(
          (res) => {
            localStorage.clear();
            console.log(res);
            if (res.data) {
              // this.interaction.setUser(res.data)
              this.interaction.refreshUserData(true)
              if (res.data.role === '1') {
                // if (role == 1) {
                localStorage.setItem('data', JSON.stringify(res.data));
                this.hotTost.success(
                  `You have successfully login!
                  Welcome ${res.data.f_name} To Admin Dashboard`
                );
                localStorage.setItem('token', res.token);
                // this.interaction.setUser(res.data)
                this.interaction.refreshUserData(true)
                this.routes.navigate(['admin/dashboard']);
              } else if (res.data.role === '2') {
                localStorage.setItem('data', JSON.stringify(res.data));
                this.hotTost.success(
                  `You have successfully login!
                  Welcome ${res.data.f_name} To Admin Dashboard`
                );
                localStorage.setItem('token', res.token);
                // this.interaction.setUser(res.data)
                this.interaction.refreshUserData(true)
                this.routes.navigate(['/supervisor/sup-profile']);
              } 
              else if(res.data.role==='3'){
                localStorage.setItem('data', JSON.stringify(res.data));
                this.hotTost.success(
                  `You have successfully login!
                  Welcome ${res.data.f_name} To Admin Dashboard`
                );
                localStorage.setItem('token', res.token);
                // this.interaction.setUser(res.data)
                this.interaction.refreshUserData(true)
                this.routes.navigate(['employee/emp-profile']);
              }
                else {
                  this.hotTost.error(res.data.message);
              }
            } else {
              this.hotTost.error('Please cheack email and password!');
            }
          },

          (err) => {
            this.hotTost.error('Please cheack email and password!');
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
