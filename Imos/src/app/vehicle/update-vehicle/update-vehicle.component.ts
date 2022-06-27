import { vehicle, vehicletype } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  updateForm:FormGroup;
  Vehicle!:vehicle;
  id!:number;
  Vehicletypes:vehicletype[]=[];

  constructor(private fb: FormBuilder, private _service:ServiceService,
    private route: ActivatedRoute,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    if(this.updateForm.valid){
      console.log(this.updateForm);
    }
    const formOptions:AbstractControlOptions={};
    this.updateForm=this.fb.group({
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      color: ['', [Validators.required]],
      modelYear: ['', [Validators.required]],
      datePurchased: ['', [Validators.required]],
      lastServiced: ['', [Validators.required]],
      vehicletypeId: ['', [Validators.required]]
    }, formOptions);

    this.id=+this.route.snapshot.params['id'];
    this._service.getVehicleById(this.id).subscribe((res:any)=>{
      this.Vehicle=res;
      console.log(this.Vehicle);
      this.updateForm=this.fb.group({
        make: ['', [Validators.required]],
        model: ['', [Validators.required]],
        color: ['', [Validators.required]],
        modelYear: ['', [Validators.required]],
        datePurchased: ['', [Validators.required]],
        lastServiced: ['', [Validators.required]],
        vehicletypeId: ['', [Validators.required]]
      }, formOptions)

    });


    this._service.getVehicleType().subscribe(data=>{
      this.Vehicletypes=data;
    })
  }
  onSubmit(){
    this._service.updateVehicle(this.route.snapshot.params['id'],this.updateForm.value).subscribe(
      res=>{
        console.log(res);
      }
    )
  }
  Cancel(){

  }
}
