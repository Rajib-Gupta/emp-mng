import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor() { }


  private user= new BehaviorSubject(null)
  public user$=this.user.asObservable()

  private refreshUser = new BehaviorSubject(null);
  public refreshUser$ = this.refreshUser.asObservable()


  setUser(data:any){
    this.user.next(data)
  }

  refreshUserData(status:boolean){
    
  }
}
