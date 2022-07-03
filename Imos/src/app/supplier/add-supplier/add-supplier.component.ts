import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup,FormBuilder, Form } from '@angular/forms';
import { ServiceService, suppliertype } from 'src/app/services/service.service';
import { FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control:FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface Supplier {
  supplierId: number,
  suppliertypeId: number,
  name: string,
  address: string,
  email: string,
  contactnumber: number,
  suppliertype: string,
  supplierorderlines: []
}


@Component({
  selector: 'app-add-supplier',
  templateUrl: 
  './add-supplier.component.html',
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
    this.buildAddForm();
  }
  private buildAddForm(){
    this.form=this.fb.group({
      name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      ContactNumber: ['', [Validators.required]],
      suppliertypeId: ['', [Validators.required]],

    });
    this._service.getSupplierType().subscribe(data =>{
      this.Suppliertypes = data;
      //console.log(data);
    });
  }

  AddSupplier(){
    if(this.form.valid){
      console.log(this.form.value);
       this._service.addSupplier(this.form.value)
       .subscribe(res=>{
       //console.log(res);
       // add validation and "are you sure to add supplier notification"
       })
    }
  }

  Cancel(){

  }
}