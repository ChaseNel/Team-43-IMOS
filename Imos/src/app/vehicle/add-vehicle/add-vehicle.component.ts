import { ServiceService, vehicletype } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Vehicle {
  vehicleId: number,
  vehicletypeId: number,
  make: string,
  model: string,
  year: string,
  color: string,
  status: string,
  datePurchased: string,
  lastServiced: string,
  vehicletype: string
}

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  addForm:FormGroup;
  Vehicletypes:vehicletype[]=[];
  

  constructor(
    private fb: FormBuilder,
    private _service:ServiceService
  ) { }

  ngOnInit(): void {
    this.buildAddForm();
  
  }
  private buildAddForm()
  {
    this.addForm=this.fb.group({
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      color: ['', [Validators.required]],
      modelYear: ['', [Validators.required]],
      datePurchased: ['', [Validators.required]],
      lastServiced: ['', [Validators.required]],
      vehicletypeId: ['', [Validators.required]]
    });
    this._service.getVehicleType().subscribe(data=>{
      this.Vehicletypes=data;
    });

  }
  AddVehicle(){
    if(this.addForm.valid){
      console.log(this.addForm.value);
      this._service.addVehicle(this.addForm.value)
      .subscribe(res=>{
        
      });
    }
  }

Cancel(){ 

}

}
