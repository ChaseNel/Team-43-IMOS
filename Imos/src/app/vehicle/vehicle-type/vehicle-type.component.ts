import { ServiceService, vehicletype } from './../../services/service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {

  // API Test
  data: vehicletype[] = [];

  displayedColumns: string[] = ['id', 'desc', 'actions'];

  dataSource!: MatTableDataSource<vehicletype>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;

  constructor(private route: Router, private service: ServiceService, private _snackBar: MatSnackBar) {
    this.GetAllVehicleTypes();
  }

  GetAllVehicleTypes() {
    this.service.getVehicleType().subscribe(x => {
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

  UpdateVehicleType() {
    this.route.navigateByUrl('/updateVehicleType')
  }

  addVehicleType() {
    this.route.navigateByUrl('/addVehicleType')
  }

  deleteVehicleType(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this Vehicle Type?')) {
      this.service.deleteVehicleType(id).subscribe(res => {
        this.GetAllVehicleTypes();
        this._snackBar.open("Success. A Vehicle Type has been deleted!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
  }
  ngOnInit(): void {
  }

}
