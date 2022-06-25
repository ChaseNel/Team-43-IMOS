import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-vehicle-type',
  templateUrl: './add-vehicle-type.component.html',
  styleUrls: ['./add-vehicle-type.component.css']
})
export class AddVehicleTypeComponent implements OnInit {

  Description: any;
  public vehicleTypeFrm!:FormGroup;
  alert: boolean = false;

  constructor(private service: ServiceService, private formB: FormBuilder) { }

  ngOnInit(): void {
    this.vehicleTypeFrm = new FormGroup({
      Description: new FormControl('', [Validators.required]),
    })
  }

  addVehicleT() {
    var val = { Description: this.Description}
    this.service.addVehicleType(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.Description = '';
    console.log(val);
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.vehicleTypeFrm.controls[controlName].hasError(errorName);
  }

}
