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

  addUserRole(payload:any) {
    return this.http.post(this.endpointBase.concat("UserRole/AddRole"),
      payload,
      { reportProgress: true, observe: 'events' });
  }

  updateUserRole(payload:any,id: string) {
    return this.http.put(this.endpointBase.concat("UserRole/EditUserRole/"+id),
      payload,
      { reportProgress: true, observe: 'events' });
  }
  deletetUserRole(id: string) {
    return this.http.delete(this.endpointBase.concat("UserRole/RemoveUserRole"  + "/" + id),
      { reportProgress: true, observe: 'events' });
  }

}
