import { ServiceService, vehicletype } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    private _service:ServiceService,
    private _snackbar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.buildAddForm();
  
  }
  private buildAddForm()
  {
    this.addForm=this.fb.group({
      make: ['', [Validators.required,Validators.pattern("[A-Za-z ]{1,25}")]],
      model: ['', [Validators.required], Validators.pattern("[A-Za-z ]{1,25}")],
      color: ['', [Validators.required, Validators.pattern("[A-Za-z ]{1,25}")]],
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
      .subscribe(
        
        res => {
          if (confirm('Are you sure you want to Add this Vehicle?')) {
            this._snackbar.open("Success, you have Add a Vehicle!", 'OK', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
          }
          else{
            this._snackbar.open("Unsuccessful", 'OK', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
          }
        });
    }
  }



  Cancel(){ 
    this.route.navigateByUrl('/vehicle')
  }

public hasError = (controlName: string, errorName: string) => {
  return this.addForm.controls[controlName].hasError(errorName);
}

}
