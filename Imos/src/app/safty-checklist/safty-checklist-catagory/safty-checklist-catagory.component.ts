import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { safetyItem, safetyitemcategory, ServiceService } from 'src/app/services/service.service';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-safty-checklist-catagory',
  templateUrl: './safty-checklist-catagory.component.html',
  styleUrls: ['./safty-checklist-catagory.component.css'],
  template:' {{data.id}}',
})

export class SaftyChecklistCatagoryComponent implements OnInit {

  hide:any;
  type:any;
  // API Test
  APIdata: safetyitemcategory[] = [];

  info:safetyItem[]=[];

  requestData:safetyItem[]=[];
  CategoryId:number;

  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource!: MatTableDataSource<safetyitemcategory>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;

  constructor(private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:{id:number},private route: Router,
  private _service: ServiceService, private _snackBar: MatSnackBar) {
    this.GetAllSafetyitemcategories();
   }
     // get all http method 
     GetAllSafetyitemcategories(){
      this._service.getSafetyCategory().subscribe(x => {
        this.APIdata = x;
        console.log(this.APIdata);
        this.posts = x;
  
        this.dataSource = new MatTableDataSource(this.posts)
  
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
     }
 
   openDialog(id:number):void{
   const dialogRef=this.dialog.open(ItemsComponent,{
    data:{id},
    width: '80%',
    height:'90%'
   });
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

  });
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
 
  }
  // close
  closeClick(){
    this._service.getSafetyCategory().subscribe(x => {
      this.APIdata = x;
      console.log(this.data);
      this.posts = x;

      this.dataSource = new MatTableDataSource(this.posts)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
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
