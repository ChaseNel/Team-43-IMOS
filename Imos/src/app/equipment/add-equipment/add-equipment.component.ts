import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {
  form:FormGroup;

  constructor( private fb: FormBuilder, private _service:ServiceService ) { }

  ngOnInit(): void {
    this.buildAddForm();
  }
  private buildAddForm(){
    this.form=this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }
  AddEquipment(){
    if(this.form.valid){
      console.log(this.form.value);
      this._service.addEquipment(this.form.value)
      .subscribe(res=>{
        //add validation and "are you sure to add equipment  notification"
      });
    }
  }
  Cancel(){

  }
}
