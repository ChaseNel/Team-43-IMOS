import { ServiceService, vehicle, vehicletype, user } from './../services/service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Vehicle {
  vehicleId: number,
  vehicletypeId: number,
  make: string,
  model: string,
  year: string,
  color: string,
  status: string,
  DatePurchased: string,
  LastServiced: string,
  vehicletype: string,
}

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  // API Test
  data: vehicle[] = [];

  displayedColumns: string[] = ['id', 'vehicleType',  'make','model','color','status','Year','DatePurchased','LastServiced','actions'];

  dataSource!: MatTableDataSource<vehicle>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;
  Typelist: vehicletype[] = [];
 // userlist: user[] = [];

  constructor(private route: Router, private service: ServiceService, private _snackBar: MatSnackBar) {
    this.GetAllVehicles();
   }

  GetAllVehicles() {
    this.service.getVehicle().subscribe(x => {
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

  UpdateVehicle(id:number) {
    this.route.navigate(['updateVehicle',id])
  }
/*  assignVehicle() {
    //or navigate (['assignVehicle',id])
    this.route.navigateByUrl('vehicle-allocation')
  }*/
 
  addVehicle() {
    this.route.navigateByUrl('/addVehicle')
  }

  deleteVehicle(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this Vehicle?')) {
      this.service.deleteVehicle(id).subscribe(res => {
        this.GetAllVehicles();
        this._snackBar.open("Success. A Vehicle has been deleted!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
  }
  assignVehicle() {
    this.route.navigateByUrl('/assign-vehicle')
  }

  VehicleType() {
    this.route.navigateByUrl('/vehicleType')
  }
  VehicleAllocation() {
    this.route.navigateByUrl('/vehicle-allocation')
  }

  ngOnInit(): void {
    this.service.getVehicleType().subscribe(x => { this.Typelist = x; console.log("type", this.Typelist) });
    //this.service.getUser().subscribe(i => { this.userlist = i; console.log("userlist", this.userlist) });
  }
}
