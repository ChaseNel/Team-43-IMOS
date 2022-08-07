import { supplier, suppliermaterial } from './../../../services/service.service';
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

  constructor(private service: ServiceService, private fb: FormBuilder) { }

  closeAlert() {
    this.alert = false;
  }
 
  ngOnInit(): void {
    this.buildOrderForm();
  }

  private buildOrderForm(){
    this.form=this.fb.group({
      supplierId: ['', [Validators.required]],
      quantity:['',[Validators.required]]
    })
  }

}
