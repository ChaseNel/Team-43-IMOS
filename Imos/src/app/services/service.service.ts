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
  readonly Root_URL = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) {
  }

  //User 
  //Get
  getUser() {
    let url = "https://localhost:5001/api/User";
    return this.http.get(url);
  }

  // update User hhtp request 
  //delete 





  //UserRole
  //Get
  getUserRole(): Observable<userrole[]> {
    return this.http.get<userrole[]>(this.Root_URL + 'UserRole/Roles/GetAll')
  }

  // update userrole  service hhtp request 
  
  // delete userrole service hhtp request





  //Employee
  //Get
  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.Root_URL + 'Employee')
  }
  // add 
  addEmployee(val: any){

    return this.http.post(this.Root_URL + 'Employee/AddEmployee',val)

  }

}


