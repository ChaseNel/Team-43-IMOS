
import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ServiceService, ViewMatarialRequest} from 'src/app/services/service.service';
import {MatFormFieldModule} from '@angular/material/form-field';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-view-material-request-details',
  templateUrl: './view-material-request-details.component.html',
  styleUrls: ['./view-material-request-details.component.css'],
  template:' {{data.id}}',
})
export class ViewMaterialRequestDetailsComponent implements OnInit {

  info: ViewMatarialRequest[] = [];

  displayedColumns: string[] = ['materialName','materialTypeName', 'quantity', 'description'];

  dataSource!: MatTableDataSource<ViewMatarialRequest>;

  materialRequestId: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: ViewMatarialRequest[];


  constructor( @Inject(MAT_DIALOG_DATA) public data:{id:number},
  private route: Router,
   private service: ServiceService,
    private _snackBar: MatSnackBar)

    {
      this.ViewMaterialRequest(this.data.id);
      console.log(this.data.id);
    }


    ViewMaterialRequest(id:number ){

      this.service.getMaterialRequetsDetails(id)
      .subscribe( x => {
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

  ngOnInit(): void {
  }

}
