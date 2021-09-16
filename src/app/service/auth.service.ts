import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponce, EmpResponce, LogInResponce } from '../model/employee';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email!: AuthResponce;
  password!: AuthResponce;

  emp_email!: EmpResponce;
  emp_password!: EmpResponce;

  constructor(private httpclient: HttpClient, private routes: Router) { }

  
  public master = (
    email: string,
    password: string,
    // role: number
  ): Observable<any> => {
    return this.httpclient.post<LogInResponce>(environment.endPoints.auth.master, {
      email: email,
      password: password,
    });
  };

  

  masterLoggedIn() {
    return !!localStorage.getItem('data');
  }

  admin(){
    var isAdmin=false;
  var data:any= localStorage.getItem('data');
  if(data){
    data=JSON.parse(data) as any;
    if(data.role==1){
      isAdmin=true;
    }
  }
  return isAdmin;
  }


  getToken() {
    return localStorage.getItem('token');
  }



  masterLogout() {
    this.routes.navigate(['/signin']);
    return localStorage.removeItem('data');
   
   
  }

}
