import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  Type: any;
  Name: any;
  Address: any;
  Email: any;
  Number: any;
  public supplierFrm!: FormGroup;
  alert: boolean = false;

  constructor(private service: ServiceService, private formB: FormBuilder) { }

  ngOnInit(): void {
    this.supplierFrm = new FormGroup({
      Type: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Number: new FormControl('', [Validators.required]),
    })
  }

  addSupplier() {
    var val = {type: this.Type, name: this.Name, address: this.Address, email: this.Email, number: this.Number}
    this.service.addSupplier(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.Name = '';
    console.log(val);
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.supplierFrm.controls[controlName].hasError(errorName);
  }

}
