import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
  }


  _name = JSON.parse(localStorage.getItem('data') as string);

  admin_fname = this._name?.f_name;
  admin_lname = this._name?.l_name;
  admin_email = this._name?.email;
  admin_phone = this._name?.phone;
  admin_desig=this._name?.desig
}
