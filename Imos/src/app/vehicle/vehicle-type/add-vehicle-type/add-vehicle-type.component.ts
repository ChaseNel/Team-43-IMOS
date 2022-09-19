import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle-type',
  templateUrl: './add-vehicle-type.component.html',
  styleUrls: ['./add-vehicle-type.component.css']
})
export class AddVehicleTypeComponent implements OnInit {

  Description: any;
  public vehicleTypeFrm!:FormGroup;
  alert: boolean = false;

  constructor(private service: ServiceService, private formB: FormBuilder, private _snackbar: MatSnackBar, private route: Router) { }

  ngOnInit(): void {
    this.vehicleTypeFrm = new FormGroup({
      Description: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z ]{1,15}"), Validators.maxLength(15)]),
    })
  }

  addVehicleT() {
    if (this.vehicleTypeFrm.valid) {
    var val = { Description: this.Description}
    this.service.addVehicleType(val).subscribe(res => {
      if (confirm('Are you sure you want to Add this Vehicle Type?')) {
        this._snackbar.open("Success, you have Add a Vehicle Type!", 'OK', {
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
    this.Description = '';
    console.log(val);
    
  }
}

back(){
  this.route.navigateByUrl("vehicleType")
}

  
  public hasError = (controlName: string, errorName: string) => {
    return this.vehicleTypeFrm.controls[controlName].hasError(errorName);
  }

}
