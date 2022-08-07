import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  project, safetyItem, safetyitemcategory, ServiceService } from '../services/service.service';

// safety checklist class on shared types 
export interface SafetyItem{
  safetyfileitemId:number,
  name:string,
  safetyitemcategoryId:number,
  safetyitemcategory:string,
  safetyfilechecklists:[]
}

@Component({
  selector: 'app-safty-checklist',
  templateUrl: './safty-checklist.component.html',
  styleUrls: ['./safty-checklist.component.css']
})
export class SaftyChecklistComponent implements OnInit {

  data: safetyItem []=[];

  displayedColumns: string[] = ['id', 'projectname','Categories', 'SafetyItems','actions'];

  dataSource!: MatTableDataSource<SafetyItem>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;
  SafetyItems:safetyItem[]=[];
  TypeList:project[]=[];
  
  CategoryTypes:safetyitemcategory[]=[];

  constructor(private _route: Router, private _service: ServiceService, private _snackBar: MatSnackBar) {
    this.GetAllProjectSafetyChecklistItem();

   }
   GetAllProjectSafetyChecklistItem(){
    this._service.getProjectChecklist().subscribe(x => {
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

// add method route addNewSafetyChecklist
addNewSafetyChecklist() {
  this._route.navigateByUrl('/AddSaftyChecklist')
}
  // update method route
  UpdateProjectSafetyChecklist(id:number) {
    //console.log("Test " +id)
    this._route.navigate(['UpdateProjectSafetyChecklist',id])
  }
  // delete method route   getSafetyCategory
  removeProjectSafetyChecklist(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this Supplier?')) {
      this._service.deleteProjectSafetyChecklist(id).subscribe(res => {
        this.GetAllProjectSafetyChecklistItem();
        this._snackBar.open("Success, you have deleted a Supplier!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
  }
  saftychecklistcatagory(){
    this._route.navigateByUrl('/saftyChecklistCatagory')
  }

  ngOnInit(): void {
    this._service.getSafetyCategory().subscribe(x=>{
    })
  }
}
