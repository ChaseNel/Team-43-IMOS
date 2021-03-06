import { ServiceService, warehouse, equipment } from './../services/service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  // API Test
  data: warehouse[] = [];

  displayedColumns: string[] = ['name', 'location', 'actions'];

  dataSource!: MatTableDataSource<equipment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;
  //typelist: materialType[] = [];

  constructor(private route: Router, private service: ServiceService, private _snackBar: MatSnackBar) {
    this.GetAllWarehouses();
  }

  GetAllWarehouses() {
    this.service.getWarehouses().subscribe(x => {
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

  UpdateWarehouse() {
    this.route.navigateByUrl('/updateWarehouse')
  }

  addWarehouse() {
    this.route.navigateByUrl('/addWarehouse')
  }

  deleteWarehouse(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this Warehouse?')) {
      this.service.deleteWarehouse(id).subscribe(res => {
        this.GetAllWarehouses();
        this._snackBar.open("Success, you have deleted a Warehouse!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
  }

  ngOnInit(): void {
    //this.service.getMaterialType().subscribe(x => { this.typelist = x; console.log("typelist", this.typelist) });
  }

}
