import { vehicletype } from './../../../services/service.service';
import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { AbstractControlOptions, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-vehicle-type',
  templateUrl: './update-vehicle-type.component.html',
  styleUrls: ['./update-vehicle-type.component.css']
})
export class UpdateVehicleTypeComponent implements OnInit {

  id!: number;
  public updateForm!: FormGroup;
  alert: boolean = false;
  VehcileType!: vehicletype;

  constructor(private service: ServiceService,private route: ActivatedRoute,
    private router: Router,private _snackbar: MatSnackBar,
    private fb: FormBuilder) 
    {
      
     }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {};
    this.updateForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(40)]],
    },formOptions);

    this.id=+this.route.snapshot.params['id'];
    this.service.getVehicleTypeID(this.id).subscribe((res:any)=>{
      this.VehcileType=res;
      console.log(this.VehcileType);
      this.updateForm=this.fb.group({
        description:[this.VehcileType.description,[Validators.required,  Validators.minLength(10), Validators.maxLength(30)]],
      },formOptions)
    });
  }

  get formdet(){
    return this.updateForm.controls;
}

  onSubmit() {
    console.log(this.updateForm.value)
    /*this.service.editVehicleType(this.route.snapshot.params['id'], this.updateForm.value).subscribe(
      res => {
        if (confirm('Are you sure you want to Update this Vehicle Type?')) {
          this._snackbar.open("Success, you have Update a Vehicle Type!", 'OK', {
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
      })*/
  }

  back() {
    this.router.navigateByUrl('vehicleType')
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.updateForm.controls[controlName].hasError(errorName);
  }
}
