import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { materialType, ServiceService } from 'src/app/services/service.service';

export interface MaterialType {
  materialTypeID: number,
  name: string,
  description: string,
  materials: []
}

@Component({
  selector: 'app-material-type',
  templateUrl: './material-type.component.html',
  styleUrls: ['./material-type.component.css']
})
export class MaterialTypeComponent implements OnInit {

// API Test
data: materialType[] = [];

displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

dataSource!: MatTableDataSource<MaterialType>;

@ViewChild(MatPaginator) paginator!: MatPaginator
@ViewChild(MatSort) sort!: MatSort

posts: any;

  constructor(private route: Router, private service: ServiceService) { 
    
    this.service.getMaterialType().subscribe(x => {
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

  UpdateMaterialType() {
    this.route.navigateByUrl('/UpdateMaterialType')
  }

  addMaterialType() {
    this.route.navigateByUrl('/AddMaterialType')
  }

  ngOnInit(): void {
  }

}
