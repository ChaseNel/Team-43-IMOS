import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { project, safetyItem, safetyitemcategory, ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

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

  alert: boolean = false;
  toppings = this.fb.group({
    //get all of the items
  });
  panelOpenState = false;
  form:FormGroup; 
   SafetyItems:safetyItem[]=[];
   TypeList:project[]=[];
  CategoryTypes:safetyitemcategory[]=[];

  constructor( private fb: FormBuilder, private _service:ServiceService, private route: Router) { }

  ngOnInit(): void {
    this.buildAddForm();``
  }
  private buildAddForm(){
    this.form=this.fb.group({
      projectId: ['', [Validators.required]],
      safetyfileitemId :['', [Validators.required]]
    })
    this._service.getSafetyCategory().subscribe(data=>{
      this.CategoryTypes=data;
    });
    this._service.getProject().subscribe(data=>{
      this.TypeList=data;
    });
  }
 
  addNewChecklist(){

  }
  closeAlert() {
    this.alert = false;
  }
  back(){
    this.route.navigateByUrl("project")
  }
}
