import { Component, OnInit, ViewChild } from '@angular/core';
import { employee, ServiceService } from './../services/service.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Employee {
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

  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!:MatSort

  posts:any;

  constructor(private route: Router, private service: ServiceService) {

    this.service.getEmployees().subscribe(x => {
      this.data = x;
      console.log(this.data);
      this.posts = x

      this.dataSource = new MatTableDataSource(this.posts)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
   }

  UpdateEmployee() {
    this.route.navigateByUrl("UpdateEmployee")
  }

  addEmployee(){
    this.route.navigateByUrl('/AddEmployee')
  }

  applyFilter(event: Event) {
    const FilterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = FilterValue.trim().toLocaleLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

  ngOnInit(): void {
  }

}
