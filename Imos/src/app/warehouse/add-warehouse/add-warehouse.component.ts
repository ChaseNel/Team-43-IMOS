import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

export interface Warehouse{
  warehouseId: number,
  name: string,
  location: string,
  warehouseequipments: [],
  warehousematerials: []
}
@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})
export class AddWarehouseComponent implements OnInit {
  form:FormGroup;
  alert: boolean = false;
  constructor(private _service: ServiceService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.buildAddForm();
  }
  private buildAddForm(){
    this.form=this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  addWarehouse(){
    if(this.form.valid){
    //  console.log(this.form.value);
      this._service.addWarehouse(this.form.value).subscribe(res=>{
        console.log(res);
      })
    }
  }
  closeAlert() {
    this.alert = false;
  }
  back(){
    this.route.navigateByUrl("warehouse")
  }
}
