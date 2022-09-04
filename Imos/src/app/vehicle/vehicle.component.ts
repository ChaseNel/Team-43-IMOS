import { ServiceService, vehicle, vehicletype, user } from './../services/service.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddVehicleComponent} from './add-vehicle/add-vehicle.component';
import { Observable } from 'rxjs';
import {UploadVehiclePhotoComponent} from './upload-vehicle-photo/upload-vehicle-photo.component';
import {  EventEmitter, Output } from '@angular/core';

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
  styleUrls: ['./vehicle.component.css'],
  template:' {{data.id}}',
})
export class VehicleComponent implements OnInit {

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;


  // API Test
  Vehicledata: vehicle[] = [];
  vehicleData: vehicle[];

  UnAssignedVehicle:vehicle[];


  displayedColumns: string[] = ['id', 'vehicleType',  'make','model','color','status','Year','DatePurchased','LastServiced','actions'];

  dataSource!: MatTableDataSource<vehicle>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;
  Typelist: vehicletype[] = [];
 // userlist: user[] = [];

  constructor(private route: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public VehicleID:{id:number},
    private service: ServiceService,
     private _snackBar: MatSnackBar) {
    this.GetAllVehicles();
   }

  GetAllVehicles() {
    this.service.getVehicle().subscribe(x => {
      this.Vehicledata = x;
      console.log(this.Vehicledata);
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


  openAddVehicleDialog(): void {
    const dialogRef = this.dialog.open(AddVehicleComponent, {

      width: '60%',
      height:'70%'
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openUploadVehiclePhotoDialog(id: number): void {
    const dialogRef = this.dialog.open(UploadVehiclePhotoComponent, {

      width: '40%',
      height:'70%',
      data:{id},

    }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
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
