import { equipment } from './../services/service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  // API Test
  data: equipment[] = [];

  displayedColumns: string[] = [ 'name', 'description', 'actions'];

  dataSource!: MatTableDataSource<equipment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;
  //typelist: materialType[] = [];

  constructor(private route: Router, private service: ServiceService, private _snackBar: MatSnackBar) {
    this.GetAllEquipment();
   }

   GetAllEquipment() {
    this.service.getEquipment().subscribe(x => {
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

  UpdateEquipment() {
    this.route.navigateByUrl('/updateEquipment')
  }

  addEquipment() {
    this.route.navigateByUrl('/addEquipment')
  }

  deleteEquipment(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this Equipment?')) {
      this.service.deleteEquipment(id).subscribe(res => {
        this.GetAllEquipment();
        this._snackBar.open("Success, you have deleted an Equipment!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
  }

  // materialType() {
  //   this.route.navigateByUrl('materialtype')
  // }

  ngOnInit(): void {
    //this.service.getMaterialType().subscribe(x => { this.typelist = x; console.log("typelist", this.typelist) });
  }

}
