import { supplier } from './../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit {

  id!: number;
  Supplier!: supplier;
  SupplierForm!: FormGroup;

  constructor(
    private route: Router,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar,
    private activate: ActivatedRoute) { }

  ngOnInit(): void {

    const formOptions: AbstractControlOptions = {};

    this.SupplierForm = this.formBuilder.group({
      suppliertypeId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactnumber: ['', [Validators.required]]
    }, formOptions);

    this.id = +this.activate.snapshot.params['id'];
    this.service.SupplierID(this.id).subscribe((res: any) => {
      this.Supplier = res;
      console.log(this.Supplier);
      this.SupplierForm = this.formBuilder.group({
        suppliertypeId: [this.Supplier.name, [Validators.required]],
        name: [this.Supplier.name, [Validators.required]],
        address: [this.Supplier.name, [Validators.required]],
        email: [this.Supplier.name, [Validators.required, Validators.email]],
        contactnumber: [this.Supplier.name, [Validators.required]]
      }, formOptions)
    })
  }

  onSubmit() {
    this.service.UpdateSuplier(this.activate.snapshot.params['id'], this.SupplierForm.value).subscribe(
      res => {
        console.log(res + "success");
        
      }
    )
  }


}
