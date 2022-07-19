import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { safetyitemcategory, ServiceService } from 'src/app/services/service.service';

export interface SafetyItem{
  safetyfileitemId:number,
  name:string,
  safetyitemcategoryId:number,
  safetyitemcategory:string,
  safetyfilechecklists:[]
}
@Component({
  selector: 'app-add-safty-checklist',
  templateUrl: './add-safty-checklist.component.html',
  styleUrls: ['./add-safty-checklist.component.css']
})
export class AddSaftyChecklistComponent implements OnInit {
  
  form:FormGroup;

  CategoryTypes:safetyitemcategory[]=[];

  constructor( private fb: FormBuilder, private _service:ServiceService) { }

  ngOnInit(): void {
    this.buildAddForm();
  }
  private buildAddForm(){
    this.form=this.fb.group({
      
    })


  }

}
