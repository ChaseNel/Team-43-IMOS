import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})
export class AddWarehouseComponent implements OnInit {

  Name: any;
  Location: any;
  public warehouseFrm!: FormGroup;
  alert: boolean = false;

  constructor(private service: ServiceService, private formB:FormBuilder) { }

  ngOnInit(): void {
    this.warehouseFrm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Location: new FormControl('', [Validators.required]),
    })
  }

  addWarehouse() {

    if (confirm('Are you sure you want to add this Warehouse?')) {

      var val = { name: this.Name, location: this.Location}
    this.service.addWarehouse(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.Name = '';
    this.Location = '';
    console.log(val);
    this.alert = true;
      };
  
  }

  closeAlert() {
    this.alert = false;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.warehouseFrm.controls[controlName].hasError(errorName);
  }

}
