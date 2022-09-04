import { materialtype, warehouse } from './../../services/service.service';

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
  suppliermaterialorders: [],
  suppliermaterials:[],
  taskmaterials: [],
  warehousematerials: []
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

  constructor(private service: ServiceService, private fb: FormBuilder, private route: Router)
   { 

   }
//this.service.getMaterialType().    subscribe(x => { this.typelist = x; console.log("typelist", this.typelist) });
  ngOnInit(): void {
    this.buildAddForm();
  }
  
  private buildAddForm(){
    this.materialFrm=this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      materialtypeId: ['', [Validators.required]],
      warehouseId: ['', [Validators.required]],
      quantity:['',[Validators.required]],
      supplierId: ['', [Validators.required]]
    });
    this.service.getMaterialType().subscribe(data=>{
      this.TypeList=data;
      console.log(data)
     
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
      let payload:any = {};
      payload['Name'] = this.materialFrm.get('name')?.value;
      payload['Description'] = this.materialFrm.get('description')?.value;
      payload['Quantity'] = this.materialFrm.get('quantity')?.value;
      payload['MaterialTypeId'] = this.materialFrm.get('materialtypeId')?.value;
     
      //Process suppliers
      let supplierIds = this.materialFrm.get('supplierId')?.value as [];
      let listOfSuppliers:any[] = [];
      supplierIds.forEach((element: any) => {
       let supplierObj:any = {};
       supplierObj['SupplierId'] = element as number;
       listOfSuppliers.push(supplierObj);
      });
     
      //Process warehouses
      let warehouseIds =this.materialFrm.get('warehouseId')?.value as [];
      let listOfWarehouses:any[] = [];
      warehouseIds.forEach((element: any) => {
       let warehouseObj:any = {};
       warehouseObj['WarehouseId'] = element as number;
       listOfWarehouses.push(warehouseObj);
      });
     
      payload['Suppliers'] = listOfSuppliers;
      payload['Warehouses'] = listOfWarehouses;
          
     console.log(payload);
       this.service.addMaterial(payload)
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
