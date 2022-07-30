import { AllocateVehicleComponent } from './../allocate-vehicle/allocate-vehicle.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService, vehicle, vehicletype } from 'src/app/services/service.service';

@Component({
  selector: 'app-vehicle-allocation',
  templateUrl: './vehicle-allocation.component.html',
  styleUrls: ['./vehicle-allocation.component.css']
})
export class VehicleAllocationComponent implements OnInit {

  data:vehicle[]=[];
  Typelist: vehicletype[] = [];

  displayedColumns: string[] = ['vehicletype','make', 'model','year','actions'];

  dataSource!: MatTableDataSource<vehicle>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts:any;

  constructor(private _service: ServiceService,private route:Router,
    public dialog:MatDialog)
    {
    this.GetAllVehiclesNotAssigned();
    
    }

  ngOnInit(): void {
  }
  GetAllVehiclesNotAssigned() {
    this._service.getAlllVehiclesNotAssigned().subscribe(x => {
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
 
  openDialog(){
    const dialogRef= this.dialog.open(AllocateVehicleComponent,{
      data:{ title:'Hello'}
    });

  }
}
