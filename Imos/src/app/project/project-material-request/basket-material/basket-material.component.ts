import { project } from './../../../services/service.service';

import { Component, ElementRef, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import{material, ServiceService} from 'src/app/services/service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  basketList: any;

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:{id:number},
    private route: Router,
     private service: ServiceService,
      private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.basketList = JSON.parse(localStorage.getItem('basket') !);
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


urgencylevelid = 1;
  createMaterialReq(){


    const basketMaterials = {
      projectid: this.data.id,
      urgencyLevelId : 1,
      fulfillment :1,

      basketMaterial: this.basketList
    }
    console.log(basketMaterials)

    this.service.createOrder(basketMaterials)
    .subscribe((res:any) => {
      this.requestAlert()
      localStorage.removeItem('basket')

    } )
  }

}
