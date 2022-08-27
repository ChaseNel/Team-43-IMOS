import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { employee, ServiceService } from './../services/service.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

export interface Employee {
  EmployeeId: number,
  documentId: number,
  name: string,
  email: string,
  contactNumber: number,
  document: string,
  projectemployees: [],
  users: [],
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  // API Test
  data: employee[] = [];

  displayedColumns: string[] = [ 'name', 'email', 'number', 'actions'];

  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  posts: any;

  constructor(private route: Router, private service: ServiceService,
    private _snackBar:MatSnackBar,public dialog: MatDialog
    ) {

    this.service.getEmployees().subscribe(x => {
      this.data = x;
      console.log(this.data);
    });
   }
   
   GetAllEmployees() {
    this.service.getEmployees().subscribe(x => {
      this.data = x;
      console.log(this.data);
      this.posts = x

      this.dataSource = new MatTableDataSource(this.posts)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteEmployee(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this employee?')) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.GetAllEmployees();
        this._snackBar.open("Success, you have deleted an Employee", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
  }

  applyFilter(event: Event) {
    const FilterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = FilterValue.trim().toLocaleLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
 
  addEmployee(){
    this.route.navigateByUrl('AddEmployee')
  }
  
  UpdateEmployee(id:number) {
    this.route.navigate(['UpdateEmployee',id])
  }

  EmployeeAttendance(){
    this.route.navigateByUrl('Employee-Attendance')

  }
  uploadEmployee(){
    this.route.navigateByUrl('upload-employee')
  }


  ngOnInit(): void {
    this.GetAllEmployees()
  }
}
