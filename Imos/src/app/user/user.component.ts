import { HttpEventType } from '@angular/common/http';
import { user, employee } from './../services/service.service';
import { userrole } from 'src/app/services/service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArrayType } from '@angular/compiler';


export interface User {
  userId: number,
  userRole: number,
  RoleDescription?: string,
  employeeId: number,
  userName: string,
  userPassword: string
}




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // API Test
  data: User[] = [];
  userRolematch!: boolean;
  itemToDelete!: User;


  displayedColumns: string[] = ['id', 'userrole', 'employeeid', 'name', 'password', 'actions'];

  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;
  rolelist: userrole[] = [];
  employeelist: employee[] = [];

  constructor(private route: Router, private service: ServiceService) {

    this.service.getUser().subscribe(x => {
      this.data = x;
      console.log(this.data);
      this.posts = x;



      this.dataSource = new MatTableDataSource(this.posts)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })


  }

  applyFilter(event: Event) {
    const FilterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = FilterValue.trim().toLocaleLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  UpdateUser() {
    this.route.navigate(['/updateuser', ])
  }

  addUser() {
    this.route.navigateByUrl('adduser')
  }

  userRole() {
    this.route.navigateByUrl('userrole')
  }

  ngOnInit(): void {

    this.service.getUserRole().subscribe(x => {  this.rolelist = x;  console.log("rolelist",this.rolelist)});
    this.service.getEmployees().subscribe(i => { this.employeelist = i; console.log("employeelist",this.employeelist)} );
  }

  onDeleteSubmit(): void {
 if (this.itemToDelete != null){
   this.service.deleteUser(this.itemToDelete.userId)
   .subscribe(event => {
     if (event.type === HttpEventType.Response){
       console.log(this.itemToDelete.userId)
     }
   })
 }
  }

  deleteUser(id: number){
    this.service.deleteUsers(id).subscribe(res => {
this.route.navigateByUrl('/user')
console.log(id)
    });
  }



}
