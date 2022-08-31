import { Router } from '@angular/router';
import { UploadsService } from './../../services/uploads/uploads.service';
import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  alert: boolean = false;

  constructor( private service:ServiceService,private _uploadsService:UploadsService,
    private fb:FormBuilder,private route:Router)
     {  }

     Name: any;
     Email:any;
     ContactNumber:any;
     public employeeFrm!: FormGroup;
     
     progress: any;
     message: any = "";
     errorMessage: any = "";
   
  ngOnInit(): void {
    this.employeeFrm = new FormGroup({
      Name: new FormControl('', [Validators.required,Validators.pattern("[A-Za-z ]{1,25}"), Validators.maxLength(25)]),
      Email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      ContactNumber: new FormControl('', [Validators.required ,Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
      FilePath:new FormControl('')
    });
  }
  // 
  addEmployee(){

    console.log(this.employeeFrm.value);
    this.service.addEmployee(this.employeeFrm.value)
    .subscribe((res: { toString: () => any; }) => {alert(res.toString());});
    }
    public uploadFile = (files:any) => {
      this.errorMessage = null;
      this.message = null;
      const validFileExtensions = ["application/pdf"];
      const maxUploadSize = 20000000; //20MB
  
      if (files.length === 0) {
        return;
      }
  
      let fileToUpload = <File>files[0];
      if (validFileExtensions.includes(fileToUpload.type) == false) {
        this.errorMessage = "Error: Accepted formats [.pdf]";
        return;
      }
  
      if (fileToUpload.size > maxUploadSize) {
        this.errorMessage = "Error: File too big.";
        return;
      }
  
      if (fileToUpload.type === validFileExtensions[0]) {
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
  
        this._uploadsService
          .uploadFile(formData)
          .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress)
            {
 // this.progress = Math.round(100 * event.loaded / event.total);
            }
             
            else if (event.type === HttpEventType.Response) {
              this.message = "Click submit to upload";
              let response = event.body as any;
              // filePath
              console.log(response.filePath)
              this.employeeFrm.controls['FilePath'].setValue(response.filePath);
            }
          });
      }
    }

    public hasError = (controlName: string, errorName: string) =>{
      return this.employeeFrm.controls[controlName].hasError(errorName);
  }
  
  closeAlert() {
    this.alert = false;
  }
  back(){
    this.route.navigateByUrl("employee")
  }
}
 