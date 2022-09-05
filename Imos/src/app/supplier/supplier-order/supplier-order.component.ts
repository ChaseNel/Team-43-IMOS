import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { orderline, ServiceService, supplier } from 'src/app/services/service.service';

export interface Orderline {
  orderId: number,
  date:Date,
  orderNumber:string,
  supplierId:number,
  supplier: string,
  suppliermaterialorders:[],
  deliveries:[]
}
@Component({
  selector: 'app-supplier-order',
  templateUrl: './supplier-order.component.html',
  styleUrls: ['./supplier-order.component.css']
})
export class SupplierOrderComponent implements OnInit {

  data:orderline[]=[];

  supplierList:supplier[]=[];

  displayedColumns: string[] = ['id', 'date', 'number', 'type','actions'];

  dataSource!: MatTableDataSource<Orderline>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;

  constructor(private route: Router, private service: ServiceService, private _snackBar: MatSnackBar)
 { 
  this.GetAllSupplierOrder();

 }
 GetAllSupplierOrder(){
  this.service.getSupplierOrders().subscribe(x=>{
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
addSupplierOrder(){
  this.route.navigateByUrl('/addSupplierOrder')

}

cancelOrder(id:number) {
  this.route.navigate(['CancelOrder',id])
}
report(){
    this.route.navigateByUrl('report')

}

  ngOnInit(): void {
  }

}
