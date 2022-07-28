import { saftyFile, ServiceService } from './../services/service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-safty-checklist',
  templateUrl: './safty-checklist.component.html',
  styleUrls: ['./safty-checklist.component.css']
})
export class SaftyChecklistComponent implements OnInit {

 // API Test
 data: saftyFile[] = [];

 displayedColumns: string[] = ['id', 'name', 'email', 'number', 'actions'];

 dataSource!: MatTableDataSource<saftyFile>;
 @ViewChild(MatPaginator) paginator!: MatPaginator
 @ViewChild(MatSort) sort!: MatSort
 posts: any;

 constructor(private route: Router, private service: ServiceService,
   private _snackBar:MatSnackBar,
   public dialog: MatDialog
   ) {

   this.service.getSaftyFile().subscribe(x => {
     this.data = x;
     console.log(this.data);
   })
  }
  GetAllSafetyFiles() {
   this.service.getSaftyFile().subscribe(x => {
     this.data = x;
     console.log(this.data);
     this.posts = x

     this.dataSource = new MatTableDataSource(this.posts)

     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   })
 }
  

 UpdateSaftyFile() {
   this.route.navigateByUrl("updatesaftyChecklist")
 }

 addSaftyFile(){
   this.route.navigateByUrl('addsaftyChecklist')
 }

 deleteSaftyFile(id: number) {
   console.log(id);
   if (confirm('Are you sure you want to delete this safty file?')) {
     this.service.deleteEmployee(id).subscribe(res => {
       this.GetAllSafetyFiles();
       this._snackBar.open("Success, you have deleted an Safty File", 'OK', {
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
 ngOnInit(): void {
   this.GetAllSafetyFiles()
 }

}
