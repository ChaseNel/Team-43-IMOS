import { Component, OnInit } from '@angular/core';

import { employee, ServiceService } from './../services/service.service';
import { Router } from '@angular/router';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // API Test
  data: employee[] = [];

  displayedColumns: string[] = ['id', 'document', 'name', 'email', 'number', 'actions'];

  constructor(private route: Router, private service: ServiceService) {

    this.service.getEmployees().subscribe(x => {
      this.data = x;
      console.log(this.data);
    })
   }

  UpdateEmployee() {
    this.route.navigateByUrl("UpdateEmployee")
  }

  addEmployee(){
    this.route.navigateByUrl('/AddEmployee')
  }

  ngOnInit(): void {
  }

}
