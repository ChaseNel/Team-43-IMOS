import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService, warehouse } from './../../services/service.service';
import { Warehouse } from './../add-warehouse/add-warehouse.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-warehouse',
  templateUrl: './update-warehouse.component.html',
  styleUrls: ['./update-warehouse.component.css']
})
export class UpdateWarehouseComponent implements OnInit {
  Warehouse!:warehouse;
  updateForm:FormGroup;
  alert: boolean = false;
  id!:number;

  constructor( private fb:FormBuilder, private _service:ServiceService,
    private route: ActivatedRoute,private router:Router,private http:HttpClient)
     { 
      
     }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {};
    this.updateForm=this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    }, 
    formOptions);

    this.id=+this.route.snapshot.params['id'];
    this._service.getWarehouseById(this.id).subscribe((res:any)=>{
      this.Warehouse=res;
      console.log(this.Warehouse);
      this.updateForm=this.fb.group({
        name:[this.Warehouse.name,[Validators.required]],
        description:[this.Warehouse.location,[Validators.required]]
      },formOptions)
    });
  }
  onSubmit(){
    this._service.UpdateWarehouse(this.route.snapshot.params['id'],this.updateForm.value).subscribe(
      res=>{
      //  console.log(res + "success");
      })
      
    }
    Update(){
      console.log(this.updateForm.value)

    }
    back(){
      
    }

    closeAlert() {
      this.alert = false;
    }
  
}
