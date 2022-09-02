import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  endpointBase = environment.endpointBase;

  constructor(private _httpClient: HttpClient,
    private _router: Router) {

  }


  setToken(token: string) {
    sessionStorage.setItem(token, "token")
  }

  getToken() {
   return sessionStorage.getItem('token')
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }


  logIn(payload: any) {
    return this._httpClient
      .post(this.endpointBase.concat("Account/Login"),
        payload, { reportProgress: true, observe: 'events' });
  }

  logOut() {
    localStorage.removeItem('token')
    this._router.navigate(['']);// to navigate back to login


  }
}
