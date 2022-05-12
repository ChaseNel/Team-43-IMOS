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
    return this.http.get<userrole[]>(this.Root_URL + '/UserRole')
  }

  //Employee
  //Get
  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.Root_URL + '/Employee')
  }

}


