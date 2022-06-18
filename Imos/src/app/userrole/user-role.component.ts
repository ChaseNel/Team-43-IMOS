import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserRole } from '../services/administration/user-role.types';
import { ServiceService, userrole } from '../services/service.service';

@Component({
  selector: 'app-user-role',
  templateUrl:'./user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {
  
  // API Test
  data: userrole[] = [];

  displayedColumns: string[] = ['id', 'description', 'actions'];

  dataSource!: MatTableDataSource<UserRole>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;

  constructor( private route:Router,private service:ServiceService) {
    this.service.getUserRole().subscribe(x => {
      this.data = x;
      console.log(this.data);
      this.posts = x

      this.dataSource = new MatTableDataSource(this.posts)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
   }

   applyFilter(event: Event) {
    const FilterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = FilterValue.trim().toLocaleLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }
  UpdateUserRole(){
    this.route.navigateByUrl('/EditUserRole/{id}')
  }

  addUserRole(){
    this.route.navigateByUrl('AddRole')
  }

  ngOnInit(): void {
  }

}
