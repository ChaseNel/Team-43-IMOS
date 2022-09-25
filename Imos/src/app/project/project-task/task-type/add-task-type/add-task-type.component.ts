import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


import {MatDialogModule} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceService,client,ClientRequest } from 'src/app/services/service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@Component({
  selector: 'app-add-task-type',
  templateUrl: './add-task-type.component.html',
  styleUrls: ['./add-task-type.component.css']
})
export class AddTaskTypeComponent implements OnInit {

  AddFormGroup: FormGroup = this.fb.group({
    Description: ['',[Validators.required]],
  })


  constructor(private fb: FormBuilder,
    private router: Router,
     private service: ServiceService,
      private snackBar: MatSnackBar,
      private MatDialog: MatDialogRef<AddTaskTypeComponent>,) { }

  ngOnInit(): void {
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.AddFormGroup.controls[controlName].hasError(errorName);
    this.snackBar.open(`form error! Enter all Details`, 'X', {duration: 5000});
  }

  AddTaskTYPE(){
    if(this.AddFormGroup.valid)
    {
      this.service.addTaskTypefinal(this.AddFormGroup.value)
      .subscribe(() => {
        this.AddFormGroup.reset();
        this.snackBar.open(`Successfully added Task Type`, 'X', {duration: 5000});
        this.MatDialog.close();
      },
      (response: HttpErrorResponse) =>{
        if (response.status === 403) {
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
        if (response.status === 500){
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
      }
      )
    }

    else {
      this.snackBar.open(`Invalid Form! Enter all inputs`, 'X', {duration: 5000});
    }
  }

}
