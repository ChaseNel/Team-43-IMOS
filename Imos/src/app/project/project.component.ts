import { project, ServiceService, constructionSite, request } from './../services/service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  // API Test
  data: project[] = [];

  displayedColumns: string[] = ['project', 'construction', 'iRequest','saftyfile', 'actions'];

  dataSource!: MatTableDataSource<project>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;
  sitelist: constructionSite[] = [];
  reqlist: request[] = [];

  constructor(private route: Router, private service: ServiceService, private _snackBar: MatSnackBar) {
    this.GetAllProjects();
  }

  GetAllProjects() {
    this.service.getProject().subscribe(x => {
      this.data = x;
      console.log(this.data);
      this.posts = x;

      this.dataSource = new MatTableDataSource(this.posts)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.data);
      
    })
  }

  applyFilter(event: Event) {
    const FilterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = FilterValue.trim().toLocaleLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  UpdateProject(id:number) {
    this.route.navigateByUrl('/updateProject/' + id)
  }

  addProject() {
    this.route.navigateByUrl('/addProject')
  }

  deleteProject(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this Project?')) {
      this.service.deleteProject(id).subscribe(res => {
        this.GetAllProjects();
        this._snackBar.open("Success, you have deleted a Project!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
  }

  deliveryNote(){
    this.route.navigateByUrl('DeliveryNote');
  }

  ngOnInit(): void {
    //this.service.getMaterialType().subscribe(x => { this.typelist = x; console.log("typelist", this.typelist) });
    this.service.getConstructionSite().subscribe(x => {this.sitelist = x; console.log("Sitelist" , this.sitelist)});
    this.service.getRequeast().subscribe(x => {this.reqlist = x; console.log("reqlist" , this.reqlist)});
    
  }

}
