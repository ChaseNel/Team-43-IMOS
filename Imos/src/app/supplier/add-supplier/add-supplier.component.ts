import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ServiceService, suppliertype } from 'src/app/services/service.service';
import { FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
// export interface Suppliertype{
//   id:number,
//   name: string
// }


@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})

export class AddSupplierComponent implements OnInit {

  form:FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  Suppliertypes: suppliertype[] = [];

  constructor(private fb: FormBuilder, private _service:ServiceService
 ) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      suppliertypeId: ['', [Validators.required]],
      name: [null, [Validators.required, Validators.minLength(15)]],
      email: [null, [Validators.required, Validators.minLength(20)]],
      address: [null],
      contact: [null, [Validators.required, Validators.minLength(10)]],
    });

    this._service.getSupplierType().subscribe(data =>{
      this.Suppliertypes = data;
    } )
  }
  //operation for add 
  addSupplier():void{
    if(this.form.valid){
      this._service.addSupplier(this.form.value)
    }
  }
}
