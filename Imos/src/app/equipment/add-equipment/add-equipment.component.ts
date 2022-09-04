import { warehouse } from './../../services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {
  form:FormGroup;
  WarehouseTypes:warehouse[]=[];
  alert: boolean = false;


  constructor(private fb: FormBuilder,
     private _service:ServiceService,private route: Router ) 
  { 

  }

  ngOnInit(): void {
    this.buildAddForm();
  }
  private buildAddForm(){
    this.form=this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      warehouseId: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    })
    this._service.getWarehouses().subscribe(data=>{
      this.WarehouseTypes=data;
    });
  }
  addEquipment(){
    if(this.form.valid){
      console.log(this.form.value);
      this._service.addEquipment(this.form.value)
      .subscribe(res=>{
        //add validation and "are you sure to add equipment  notification"
      })
  }
}
closeAlert() {
  this.alert = false;
}
back(){
  this.route.navigateByUrl("equipment")
}
public hasError = (controlName: string, errorName: string) => {
  return this.form.controls[controlName].hasError(errorName);
}

}
