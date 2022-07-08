import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-supplier-type',
  templateUrl: './add-supplier-type.component.html',
  styleUrls: ['./add-supplier-type.component.css']
})
export class AddSupplierTypeComponent implements OnInit {

  Name: any;
  public supplierTypeFrm!: FormGroup;
  alert: boolean = false;

  constructor(private service: ServiceService, private formB:FormBuilder) { }

  ngOnInit(): void {
    this.supplierTypeFrm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
    })
  }

  addSupplierT() {
    var val = { name: this.Name}
    this.service.addSupplierType(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.Name = '';
    console.log(val);
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.supplierTypeFrm.controls[controlName].hasError(errorName);
  }
}
