import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class FullscreenService {
  

  constructor(private router: Router) {
   
  }

}

