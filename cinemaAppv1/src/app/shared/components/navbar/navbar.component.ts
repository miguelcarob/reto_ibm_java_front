import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthService} from '../../../auth/auth.service';
import {log} from "util";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(
      private _authService: AuthService,
  ) { }

  ngOnInit() {
  }

  isAdministrator() {
    if(this._authService.checkAuthStatus()){
      if(this._authService.checkAuthType()===1){
        return true
      }
    }
  return false
  }


    isCinema() {
      if(this._authService.checkAuthStatus()){
        if(this._authService.checkAuthType()===3){
          return true
        }
      }
      return false
    }

  isLogged() {

    if(!localStorage.getItem('user_cinemaApp')){
    return false;
    }

    return true;
  }
}
