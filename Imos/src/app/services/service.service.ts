import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Employee Interface
export interface employee {
  employeeID: number,
  documentId: number,
  name: string,
  email: string,
  contactNumber: number,
  document: null,
  projectEmp: null,
  users: null
}

//User Interface
export interface user{
    userId: number,
    userRole: number,
    employeeId: number,
    userName: string,
    userPassword: string,
    employee: null,
    userroleNavigation: null,
    equipmentchecks: [],
    stocktakes: [],
    tasks:[],
    userincidents:[],
    vehicles: []
}

//User Role Interface
export interface userrole{
  userRole: number,
  description: string
}


@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  //URL from API
  readonly Root_URL = 'https://localhost:44381/api'

  constructor(private http: HttpClient) {
  }

  //User
  //Get
  getUser(): Observable<user[]> {
    return this.http.get<user[]>(this.Root_URL + '/User')
  }

  //UserRole
  //Get
  getUserRole(): Observable<userrole[]> {
    return this.http.get<userrole[]>(this.Root_URL + '/UserRole/Roles/GetAll')
  }

  //UserRole
  //Add
  addUserRole(val: any){

    return this.http.post(this.Root_URL + '/UserRole/AddRole',val)

  }

   //User Role
  //Delete User Role

  deleteUserRole(id: any): Observable<any>{
    console.log(id);
    const deleteEndpoint = this.Root_URL + '/UserRole/RemoveUserRole/' + id;
    return this.http.delete(deleteEndpoint);

  }

  //Employee
  //Get
  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.Root_URL + '/Employee')
  }

//Employee
  //Add
  addEmployee(val: any){

    return this.http.post(this.Root_URL + '/Employee/CreateEmployee',val)

  }

 

}


