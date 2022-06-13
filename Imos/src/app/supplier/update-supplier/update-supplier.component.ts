import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { ServiceService, suppliertype } from 'src/app/services/service.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

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
  updateForm:FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  Suppliertypes: suppliertype[] = [];

  constructor( private fb: FormBuilder, private _service:ServiceService) { }

  ngOnInit(): void {
    this.buildUpdateForm();

  }
  private buildUpdateForm(){
    this.updateForm=this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      ContactNumber: ['', [Validators.required]],
      suppliertypeId: ['', [Validators.required]]
    });
    this._service.getSupplierType().subscribe(data =>{
      this.Suppliertypes = data;
      })

      
  }
  
  updateSupplier(){
    //pass Id in constructor
    if(this.updateForm.valid){
      //console.log(this.updateForm.value);
      let updateId = this.updateForm.get("Id")?.value as number;
       this._service.addSupplier(this.updateForm.value)
       .subscribe(res=>{
        
       });
  }
}

Cancel(){

}

}
