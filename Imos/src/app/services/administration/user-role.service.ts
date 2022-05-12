import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  endpointBase= environment.endpointBase;
  constructor(
    private http:HttpClient,
    private _router:Router

  ) { }
  getAllUserRoles(){
    return this.http.get(this.endpointBase.concat("Roles/GetAll"));
  }


}
