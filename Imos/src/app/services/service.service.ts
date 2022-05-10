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
  getUser() {
    let url = "https://localhost:44381/api/User";
    return this.http.get(url);
  }

  //Employee
  //Get
  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.Root_URL + '/Employee')
  }

}


