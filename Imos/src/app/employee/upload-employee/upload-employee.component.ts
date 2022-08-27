import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { employee, ServiceService } from 'src/app/services/service.service';
import { Employee } from '../employee.component';
import { UploadFinishedEventArgs } from 'src/app/shared/shared.types';


@Component({
  selector: 'app-upload-employee',
  templateUrl: './upload-employee.component.html',
  styleUrls: ['./upload-employee.component.css']
})
export class UploadEmployeeComponent implements OnInit {

  data: employee[] = [];

  displayedColumns: string[] = [ 'name', 'email','actions'];

  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;

  //For Upload Via CSV
  form:FormGroup;
  incorrectTypeErrorMessage = null;
  progress: any;
  
  showProgress = false;

  fileUrl: string = "";
  selectedfile: File;
  
  uploadUrlFromServer: UploadFinishedEventArgs;
 // fileToUpload: File=null; 
 isUploadReady: boolean = false;
  
  constructor(private route: Router, private _service: ServiceService,
    private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this._service.getAllmployees().subscribe(x => {
      this.data = x;
      console.log(this.data);
    });
  }
  
  GetAllEmployees() {
    this._service.getAllmployees().subscribe(x => {
      this.data = x;
      console.log(this.data);
      this.posts = x

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
  
  AddUploadEmployee(){
    this.route.navigateByUrl('AddUploadEmployee')
  }

  UpdateEmployee(id:number){

  }
  // Upload Employee Via CSV
  onSubmitUpload(){
 
  }

  private buildUploadForm(_formBuilder:FormBuilder){
    this.form=_formBuilder.group({
      FileUrl: [""],
    })
  }

  get FileUrl() {
    return this.form.get('FileUrl');
  }


}
