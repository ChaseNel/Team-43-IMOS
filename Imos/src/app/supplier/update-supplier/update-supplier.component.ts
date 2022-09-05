import { Supplier } from './../supplier.component';
import { HttpClient } from '@angular/common/http';
import { supplier } from './../../services/service.service';
import { AbstractControlOptions, FormBuilder,FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { ServiceService, suppliertype } from 'src/app/services/service.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { ActivatedRoute, Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})

export class UpdateSupplierComponent implements OnInit {
 Supplier!:supplier;
  id!: number;
  updateForm:FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  Suppliertypes: suppliertype[] = [];
//  Supplier:supplier=new supplier();

  constructor( private fb:FormBuilder, private _service:ServiceService,
    private route: ActivatedRoute,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {};
    this.updateForm=this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contactnumber: ['', [Validators.required]],
      suppliertypeId: ['', [Validators.required]]
    }, formOptions);

    this.id=+this.route.snapshot.params['id'];
    this._service.getSupplierById(this.id).subscribe((res:any)=>{
      this.Supplier=res;
      console.log(this.Supplier);
      this.updateForm=this.fb.group({
        suppliertypeId:[this.Supplier.name,[Validators.required]],
        name:[this.Supplier.name,[Validators.required]],
        address:[this.Supplier.address,[Validators.required]],
        email:[this.Supplier.email,[Validators.required]],
        contactnumber:[this.Supplier.contactNumber,[Validators.required]],
      },formOptions)
    });
    this._service.getSupplierType().subscribe(data =>{
      this.Suppliertypes = data;
      });

  }
  
  onSubmit(){
    this._service.updateSupplier(this.route.snapshot.params['id'],this.updateForm.value).subscribe(
      res=>{
       // console.log(res + "success");
      })
    }
  Cancel(){
    
  }
}

