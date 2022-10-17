import { warehouse } from 'src/app/services/service.service';

import { warehouseMaterial,ServiceService } from './../../services/service.service';

import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-warehouse-material',
  templateUrl: './warehouse-material.component.html',
  styleUrls: ['./warehouse-material.component.css']
})
export class WarehouseMaterialComponent implements OnInit {

warehouse: warehouseMaterial[] = [];

displayedColumns: string[] = ['materialName','materialType','quantityONHand',]

dataSource!: MatTableDataSource<warehouseMaterial>;


@ViewChild(MatPaginator) paginator!: MatPaginator

  @ViewChild(MatSort) sort!: MatSort


  posts: any;


  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public info:{id:number},
     private route: Router,
      private service: ServiceService,
       private _snackBar: MatSnackBar) {

       this.getWarehouseMaterial();
       }

  ngOnInit(): void {
    console.log(this.info.id)
  }


getWarehouseMaterial(){
this.service.getWarehouseMaterial(this.info.id)
.subscribe(x => {
  console.log(x);
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

}
