import { Employee } from './../../employee/employee.component';
import { employee, project, ServiceService } from './../../services/service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-staff',
  templateUrl: './project-staff.component.html',
  styleUrls: ['./project-staff.component.css']
})
export class ProjectStaffComponent implements OnInit {

  data:employee[]=[];
  displayedColumns: string[] = [ 'projectname','role','name', 'email', 'contact','actions'];

  dataSource!: MatTableDataSource<Employee>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;

  projectList:project[]=[];
  TypeList:employee[]=[];

  constructor(private route: Router, private service: ServiceService,
     private _snackBar: MatSnackBar)
      {
        this.GetAllProjectStaff();

      }

      GetAllProjectStaff() {
        this.service.getProjectStaff().subscribe(x => {
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

 
  UpdateProjectStaff(id:number) {
    this.route.navigate(['updateProjectStaff',id])
  }

  addProjectStaff() {
    this.route.navigateByUrl('AddStaff')
  }
  deleteProjectStaff(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this Equipment?')) {
      this.service.deleteEquipment(id).subscribe(res => {
        this.GetAllProjectStaff();
        this._snackBar.open("Success, you have deleted an Equipment!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
  }
  ngOnInit(): void {
  }

}
