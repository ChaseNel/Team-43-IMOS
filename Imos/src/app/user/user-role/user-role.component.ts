import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService, userrole } from 'src/app/services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UserRole {
  userrole: number,
  description: string
}

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
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

  constructor(private route: Router, private service: ServiceService, private _snackBar: MatSnackBar) {
    this.GetAllUserRoles();
  }

  GetAllUserRoles() {
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  UpdateUserRole() {
    this.route.navigateByUrl('updateuserrole')
  }

  addUserRole() {
    this.route.navigateByUrl('adduserrole')
  }

  deleteUserRole(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this User Role?')) {
      this.service.deleteUserRole(id).subscribe(res => {
        this.GetAllUserRoles();
        this._snackBar.open("Success", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
  }

  ngOnInit(): void {
  }
}


