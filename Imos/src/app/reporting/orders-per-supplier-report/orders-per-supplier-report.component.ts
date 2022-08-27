import { Orderline } from './../../supplier/supplier-order/supplier-order.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-orders-per-supplier-report',
  templateUrl: './orders-per-supplier-report.component.html',
  styleUrls: ['./orders-per-supplier-report.component.css']
})
export class OrdersPerSupplierReportComponent implements OnInit {

  minDate: Date;
  maxDate: Date;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  
  displayedColumns: string[] =['date','orderNumber','supplierName']
  dataSource!: MatTableDataSource<Orderline>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;



  constructor() { 

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 2, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
  }
downloadPDF(){
  
}

}
