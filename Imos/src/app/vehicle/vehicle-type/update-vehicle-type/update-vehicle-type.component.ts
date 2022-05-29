import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-vehicle-type',
  templateUrl: './update-vehicle-type.component.html',
  styleUrls: ['./update-vehicle-type.component.css']
})
export class UpdateVehicleTypeComponent implements OnInit {

  Id!: string;
  Description1: any;
  public vehicleTypeFrm!: FormGroup;
  alert: boolean = false;
  @Input() type: any;
  


  constructor(private service: ServiceService, private routed: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    this.vehicleTypeFrm = new FormGroup({
      Description: new FormControl('', [Validators.required]),
    })

    this.Id = this.type.vehicleTypeId;
    this.Description1 = this.type.description;

  }


  updateVehicleT(){
    var id = this.type.vehicletypeId;
    var val = {description : this.Description1};
    this.service.editVehicleType(id, val).subscribe((res: { toString: () => any; }) => {alert(res.toString());});
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.vehicleTypeFrm.controls[controlName].hasError(errorName);
  }

 

}
