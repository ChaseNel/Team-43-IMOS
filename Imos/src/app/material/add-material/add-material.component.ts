import { warehouse } from './../../services/service.service';

import { Supplier } from './../../supplier/supplier.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { equipment, materialtype, ServiceService, supplier } from 'src/app/services/service.service';

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

  constructor(private service: ServiceService, private formB: FormBuilder, private route: Router)
   { 

   }
//this.service.getMaterialType().    subscribe(x => { this.typelist = x; console.log("typelist", this.typelist) });
  ngOnInit(): void {
    this.buildAddForm();
  }
  
  private buildAddForm(){
    
    this.materialFrm=this.formB.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
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
       .subscribe(res=>{
       console.log(res);
       // add validation and WarehouseTypes "are you sure to add supplier notification"
       })
    }
  }
  closeAlert() {
    this.alert = false;
  }
  back(){
    this.route.navigateByUrl("material")
  }

}
