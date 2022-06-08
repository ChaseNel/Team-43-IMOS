import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  addForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private _service:ServiceService
  ) { }

  ngOnInit(): void {
    this.buildAddForm();
  
  }
  private buildAddForm(){
    this.addForm=this.fb.group({
      Make: ['', [Validators.required]],
      Model: ['', [Validators.required]],



    });

  }

}
