import { HttpErrorResponse } from '@angular/common/http';
import { project } from './../../../services/service.service';

import { Component, ElementRef, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import{material, ServiceService, UrgencyLevel,materialRequest} from 'src/app/services/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-basket-material',
  templateUrl: './basket-material.component.html',
  styleUrls: ['./basket-material.component.css']
})
export class BasketMaterialComponent implements OnInit {

observeUrgencyLvls: Observable<UrgencyLevel[]> = this.service.getUrgencylvl();
urgencylevelId : string;

UrgencylevelData : UrgencyLevel[];



  basketList: any;
  form: FormGroup;

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:{id:number},
    private route: Router,
     private service: ServiceService,
      private _snackBar: MatSnackBar,
      private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.basketList = JSON.parse(localStorage.getItem('basket') !);

    this.observeUrgencyLvls.subscribe( x => {
      this.UrgencylevelData = x;
      console.log(this.UrgencylevelData)
    },
    (err: HttpErrorResponse) =>{
      console.log(err)
    });



    this.form= this.formBuilder.group({
      level: ['',Validators.required],
    })
  }

  viewbasket(){
    this.basketList = JSON.parse(localStorage.getItem('basket')!);
  }

  async requestAlert(){
    this._snackBar.open('Checkout was completed successfully', 'Ok',{
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }

  async removeAlert(){
    this._snackBar.open('The material was successfully removed from the basket', 'Ok',{
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }

  deleteItem(item: any){
    this.removeAlert();
    this.basketList.splice(this.basketList.indexOf(item),1);
    localStorage.setItem('basket',JSON.stringify(this.basketList));
  }

  ChangeUrgencylvl(e:any){
    this.form.patchValue({
         id: e.target.value
       })
   }

get levelId(){
  return this.form.get('level')

}



  createMaterialReq(){

 console.log(this.form.get('level'))

    if(this.form.valid && this.basketList != null)


     {
      const basketMaterials = {
        projectid: this.data.id,
        urgencyLevelId : this.form.controls['level'].value,


        basketMaterial: this.basketList
      }
      console.log(basketMaterials)

      this.service.AddMaterialRequest(basketMaterials)
      .subscribe((res:any) => {
        this.requestAlert()
        localStorage.removeItem('basket')

      } )

    }

    else if (this.basketList == null){
      this._snackBar.open('basket is empty', 'Ok',{
        duration: 3000,
        verticalPosition: 'bottom',
      });
    }




  }

}
