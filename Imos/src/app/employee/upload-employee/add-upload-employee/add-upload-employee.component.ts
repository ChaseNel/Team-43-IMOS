import { HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadFinishedEventArgs } from 'src/app/shared/shared.types';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-upload-employee',
  templateUrl: './add-upload-employee.component.html',
  styleUrls: ['./add-upload-employee.component.css']
})
export class AddUploadEmployeeComponent implements OnInit {

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
    private _snackBar:MatSnackBar, private fb: FormBuilder)
     {

      }

  ngOnInit(): void {
    this.buildUploadForm(this.fb);

  }
onCancelUpload(){

}
onSubmitUpload(){
  if(this.uploadUrlFromServer){
    this.FileUrl?.setValue(this.uploadUrlFromServer.filePath)
    if(this.form.valid){
      this._service.addEmployeeInCSV(this.form.value).subscribe()
   
    }
  }
}

addFile(element:Event,){
  const elementTarget:any = element.target as HTMLInputElement;
    const file = elementTarget.files.item(0);

    this.incorrectTypeErrorMessage = null;
    const acceptedfileTypes = ['.csv', 'application/vnd.ms-excel'];
    const maxUploadSize = 1073741824; //1GB

    if (file.name === null) {
      return;
    }
    if (file.size > maxUploadSize) {
      this.incorrectTypeErrorMessage == "File too big. File should be less than 1GB";
      return;
    }

    if (!acceptedfileTypes.includes(file.type)) {
      this.incorrectTypeErrorMessage == "File type not accepted. Upload an file with [.csv] extensions";
      return;
    }
    //Show file preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      // this.showFileBackground(event.target.result)
    }
    reader.readAsDataURL(file);

    this.selectedfile = file;
    this.sendFileToServer()
}
private sendFileToServer(){

  let fileToUpload: File = this.selectedfile;
  const formData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);
  this._service.uploadEmployeeInCSV(formData).subscribe();
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
