import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-warehouse',
  templateUrl: './update-warehouse.component.html',
  styleUrls: ['./update-warehouse.component.css']
})
export class UpdateWarehouseComponent implements OnInit {

  Id!: string;
  Name1: any;
  Location: any;
  public warehouseFrm!: FormGroup;
  alert: boolean = false;
  @Input() type: any;
  


  constructor(private service: ServiceService, private routed: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    this.warehouseFrm= new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Location: new FormControl('', [Validators.required]),
    })

    this.Id = this.type.suppliertypeId;
    this.Name1 = this.type.name;
    this.Location = this.type.location;

  }


  updateWarehouse(){

    if (confirm('Are you sure you want to update this Warehouse?')){
    var id = this.type.warehouseId;
    var val = {Name : this.Name1, Location: this.Location};
    this.service.editWarehouse(id, val).subscribe((res: { toString: () => any; }) => {alert(res.toString());});
    this.Name1 = "";
    this.Location = "";
    this.alert = true;
    }
  }

  closeAlert() {
    this.alert = false;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.warehouseFrm.controls[controlName].hasError(errorName);
  }


}
