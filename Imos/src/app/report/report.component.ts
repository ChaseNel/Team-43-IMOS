
import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewMatarialRequest,MaterialRequestStatus,ServiceService} from 'src/app/services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MaterialRequestReportViewComponent } from './material-request-report-view/material-request-report-view.component';
import { RequestcountreportComponent } from './requestcountreport/requestcountreport.component';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  observeRequestStatus: Observable<MaterialRequestStatus[]> = this.service.getMaterialRequestStatus();
  form: FormGroup;
  materialRequestData: MaterialRequestStatus[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{id:number},
    private route: Router,
     private service: ServiceService,
      private _snackBar: MatSnackBar,
      private formBuilder: FormBuilder,
      private dialog: MatDialog,

  ) { }



  ngOnInit(): void {

    this.observeRequestStatus.subscribe(x => {
      this.materialRequestData = x;
      console.log(this.materialRequestData)
    },
    (err: HttpErrorResponse) => {
      console.log(err)
    }
    );

    this.form= this.formBuilder.group({
      name : ['',Validators.required],
    })
  }

  ChangeMaterialRequestStatus(e:any){
    this.form.patchValue({
         id: e.target.value
       })
   }

   openRequestCountReportViewDialog(): void {
    const dialogRef = this.dialog.open(RequestcountreportComponent, {
      width: '80%',
      height:'90%'
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }







   openDialog(): void {

    if(this.form.valid){

      const dialogRef = this.dialog.open(MaterialRequestReportViewComponent
        , {
        width: '50%',
        height:'60%',
        data: {id:this.form.controls['name'].value }
      });


      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');


        console.log(this.form.controls['name'].value)

      });
    }
else{
  this._snackBar.open('Please Select Status', 'X',
  {duration:5000} )
}

    }


}
