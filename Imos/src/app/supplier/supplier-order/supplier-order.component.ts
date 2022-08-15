import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { orderline, ServiceService } from 'src/app/services/service.service';

export interface Orderline {
  orderId: number,
  date:Date,
  orderNumber:string,
  deliveries:[],
  suppliermaterialorders:[],
  suppliersordersuppliers:[]
}
@Component({
  selector: 'app-supplier-order',
  templateUrl: './supplier-order.component.html',
  styleUrls: ['./supplier-order.component.css']
})
export class SupplierOrderComponent implements OnInit {

  data:orderline[]=[];

  displayedColumns: string[] = ['id', 'date', 'number','actions'];

  dataSource!: MatTableDataSource<Orderline>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;

  constructor(private route: Router, private service: ServiceService, private _snackBar: MatSnackBar)
 { 

 }

 applyFilter(event: Event) {
  const FilterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = FilterValue.trim().toLocaleLowerCase()

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage()
  }
}
addSupplierOrder(){
  this.route.navigateByUrl('/addSupplierOrder')

}

cancelOrder(id:number) {
  this.route.navigate(['CancelSupplierOrder',id])
}
report(){
    this.route.navigateByUrl('report')

}

  ngOnInit(): void {
  }

}
