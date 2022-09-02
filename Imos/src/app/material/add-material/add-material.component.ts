import { materialtype, warehouse } from './../../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Supplier } from './../../supplier/supplier.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { equipment,ServiceService, supplier } from 'src/app/services/service.service';

export interface Material {
  materialId: number,
  materialtypeId: number,
  name: string,
  description: string,
  materialtype: string,
  projectmaterialrequestlists: [],
  projectmaterials: [],
  supplierorderlines: [],
  suppliermaterials:[],
  taskmaterials: [],
  warehouse:string
  warehouseId:number
}

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})

export class AddMaterialComponent implements OnInit {
   materialFrm: FormGroup;
   alert: boolean = false;
   TypeList: materialtype[] = [];
   SupplierList :supplier[]=[];
   WarehouseTypes: warehouse[] = [];

  constructor(private service: ServiceService, private formB: FormBuilder, private route: Router,  private _snackbar: MatSnackBar)
   { 

   }
//this.service.getMaterialType().    subscribe(x => { this.typelist = x; console.log("typelist", this.typelist) });
  ngOnInit(): void {
    this.buildAddForm();
  }
  
  private buildAddForm(){
    
    this.materialFrm=this.formB.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-z ]{1,25}"), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      materialtypeId: ['', [Validators.required]],
      warehouseId: ['', [Validators.required]],
      quantity:['',[Validators.required]],
      supplierId: ['', [Validators.required]]
    });
    this.service.getMaterialType().subscribe(data=>{
      this.TypeList=data;
    });
    this.service.getWarehouses().subscribe(data=>{
  this.WarehouseTypes=data;
});
this.service.getSupplier().subscribe(data=>{
  this.SupplierList=data;
})

}
AddMaterial() {
    if(this.materialFrm.valid){
      console.log(this.materialFrm.value);
       this.service.addMaterial(this.materialFrm.value)
       .subscribe(res=> {
        if (confirm('Are you sure you want to Add this Material?')) {
          this._snackbar.open("Success, you have Add a Material!", 'OK', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
        }
        else{
          this._snackbar.open("Unsuccessful", 'OK', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
        }})
    }
  }
  

  public hasError = (controlName: string, errorName: string) => {
    return this.materialFrm.controls[controlName].hasError(errorName);
  }

  back(){
    this.route.navigateByUrl("material")
  }
}
