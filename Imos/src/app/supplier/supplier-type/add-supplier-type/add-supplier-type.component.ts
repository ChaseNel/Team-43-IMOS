import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-supplier-type',
  templateUrl: './add-supplier-type.component.html',
  styleUrls: ['./add-supplier-type.component.css']
})
export class AddSupplierTypeComponent implements OnInit {

  Name: any;
  public supplierTypeFrm!: UntypedFormGroup;
  alert: boolean = false;

  constructor(private service: ServiceService, private formB: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.supplierTypeFrm = new UntypedFormGroup({
      Name: new UntypedFormControl('', [Validators.required]),
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
