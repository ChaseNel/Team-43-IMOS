import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

export interface Safetyitemcategory{
  safetyitemcategoryId:number,
  categoryName:string,
  Safetyfileitems:[]
}

@Component({
  selector: 'app-safty-checklist-catagory',
  templateUrl: './safty-checklist-catagory.component.html',
  styleUrls: ['./safty-checklist-catagory.component.css']
})
export class SaftyChecklistCatagoryComponent implements OnInit {

  type: any;
  hide: boolean = false;
  
  // API Test
  data: Safetyitemcategory[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource!: MatTableDataSource<Safetyitemcategory>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;
  constructor(private route: Router, private _service: ServiceService, private _snackBar: MatSnackBar) {
 //  this.GetAllSafetyitemcategories();

   }
   // get all http method 
   GetAllSafetyitemcategories(){
    /*this._service.getSafetyCategory().subscribe(x => {
      this.data = x;
      console.log(this.data);
      this.posts = x;

      this.dataSource = new MatTableDataSource(this.posts)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })*/
   }
   //search 
   applyFilter(event: Event) {
    const FilterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = FilterValue.trim().toLocaleLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
   // update
   UpdateSafetyItemCategory(element: any) {
    this.type = element;
    this.hide = true;
  }
  // close
 closeClick(){
    this.hide= false;
   /* this._service.getSafetyCategory().subscribe(x => {
      this.data = x;
      console.log(this.data);
      this.posts = x;

      this.dataSource = new MatTableDataSource(this.posts)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })*/
  }

   //add 
  addSafetyItemCategory() {
    this.route.navigateByUrl('/AddSafetyChecklistCategory')
  }
   //delete  deleteSafetyItemCategory(
   removeSafetyItemCategory(id:number){
    console.log(id);
    if (confirm('Are you sure you want to delete this Supplier Type?')) {
      this._service.deleteSafetyItemCategory(id).subscribe(res => {
        this.GetAllSafetyitemcategories();
        this._snackBar.open("Success, you have deleted a Supplier Type!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
   }

  ngOnInit(): void {
  }
}
