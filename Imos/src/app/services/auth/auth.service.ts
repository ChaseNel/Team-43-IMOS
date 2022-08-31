import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpointBase = environment.endpointBase;
  
  constructor(private _httpClient: HttpClient,
    private _router: Router)
    { 

    }
    logIn( payload:any ){
      return this._httpClient
      .post(this.endpointBase.concat("Account/Login"), 
      payload, { reportProgress: true, observe: 'events' });
    }

      logOut(){
      

    }
}
