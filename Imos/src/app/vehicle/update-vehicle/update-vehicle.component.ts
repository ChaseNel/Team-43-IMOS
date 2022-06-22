import { vehicle, vehicletype } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  updateForm:FormGroup;
  Vehicletypes:vehicletype[]=[];

  constructor(private fb: FormBuilder, private _service:ServiceService) { }

  ngOnInit(): void {
    this.buildUpdateForm();
  }
  private buildUpdateForm(){
    this.updateForm=this.fb.group({
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
    })
  }
  updateVehicle(){

  }
  Cancel(){

  }

}
