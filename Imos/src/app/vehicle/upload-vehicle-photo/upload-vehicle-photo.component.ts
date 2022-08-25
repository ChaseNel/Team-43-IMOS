import { Vehicle } from './../add-vehicle/add-vehicle.component';

import { ServiceService, vehicle, vehicletype, user } from 'src/app/services/service.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Observable } from 'rxjs';

import {  EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-upload-vehicle-photo',
  templateUrl: './upload-vehicle-photo.component.html',
  styleUrls: ['./upload-vehicle-photo.component.css'],
  template:' {{data.id}}',
})
export class UploadVehiclePhotoComponent implements OnInit {

  uploadform:FormGroup;
  filePath: string;

  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();


vehicleImageUploadUrl = environment.endpointBase
      .concat("Uploads/Vehicles/Upload")



  constructor( private fb: FormBuilder,
     private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:{id:number},
     private route: Router,
      private service: ServiceService,
       private _snackBar: MatSnackBar,
       private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.data.id)
  }

  private buildUploadForm() {
    this.uploadform = this.fb.group({
      VehicleId: ['',[Validators.required]],
      imageUrl: ['', [Validators.required]],
    });
  }

uploadFile = (files:any) => {

  if (files.length === 0) {
    return;
  }


  let fileToUpload = <File>files[0];
  const obj = new FormData();
  obj.append('file', fileToUpload, fileToUpload.name);


this.service.uploadVehiclePhoto(obj)
.subscribe({
  next: (event) => {
    if (event.type === HttpEventType.UploadProgress)
    this.progress = Math.round(100 * event.loaded/ event.total);

    else if (event.type === HttpEventType.Response){
      this.message = 'Upload success.';
    //  this._snackBar.open(`Upload success`, 'X', {duration: 5000});
      this.onUploadFinished.emit(event.body);
    }
  },
  error: (err: HttpErrorResponse) => console.log(err)
})


}


url = '';
onSelectedFile(event: any){
  if (event.target.files && event.target.files[0])
{
  var reader = new FileReader();

  reader.readAsDataURL(event.target.files[0]); // read file as data url

  reader.onload = (event: any) => {
    console.log(event);
        this.url = event.target.result;
  }

}

}



}
