import { material, supplier, suppliermaterial } from './../../../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  
  selector: 'app-add-supplier-order',
  templateUrl: './add-supplier-order.component.html',
  styleUrls: ['./add-supplier-order.component.css']
})
export class AddSupplierOrderComponent implements OnInit {

  alert:boolean=false;
  supplierList:suppliermaterial[]=[];
  form:FormGroup;
  form1:FormGroup;
  supplierMaterialsList:material[]=[];
  id!: number;


  constructor(private _service: ServiceService, private fb: FormBuilder) { }

  closeAlert() {
    this.alert = false;
  }
 
  ngOnInit(): void {
    this.buildOrderForm();

    this.form.controls['SupplierId'].valueChanges.subscribe( val =>{
      this.getSuppierMaterial(Number(val))
    })
  }

  setCurrentId(id:number){
    this.id=id
  }
 
  private buildOrderForm(){

  
    this.form=this.fb.group({
      SupplierId: ['', [Validators.required]],
      Quantity:['',[Validators.required]],
      Materials: ['',[Validators.required]],
      
    })
  
    this._service.getMaterialBySupplierId().subscribe(data=>{
      this.supplierList=data;
      console.log(data)
    })
  
  }
  
  getSuppierMaterial(id: number) {
    this._service.getSupplierMaterial(id).subscribe(res =>{
      this.supplierMaterialsList = res;
    })

  }
  addToOrderSupplierCart(materials: any){
    console.table(this.form.value);
    let order = {
      SupplierId: this.form.value.SupplierId,
      Quantity: this.form.value.Quantity,
      Materials: [...this.form.value.Materials,]
    }
    console.log(order)
    this._service.addToOrderSupplierCart(order).subscribe(res =>{
      console.log(res)
    })
  }

  generateSupplierOrder(){

  }
  


}
