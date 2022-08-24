import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { project, safetyItem, safetyitemcategory, ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-safty-checklist',
  templateUrl: './add-safty-checklist.component.html',
  styleUrls: ['./add-safty-checklist.component.css']
})
export class AddSaftyChecklistComponent implements OnInit {

  alert: boolean = false;
  form:FormGroup; 
   SafetyItems:safetyItem[]=[];
   TypeList:project[]=[];
  

  constructor( private fb: FormBuilder, private _service:ServiceService, private route: Router) { }

  ngOnInit(): void {
    this.buildAddForm();``
  }
  private buildAddForm(){
    this.form=this.fb.group({
      id: ['', [Validators.required]], // project
      Id :['', [Validators.required]] // safety Items 
    })
    this._service.getProject().subscribe(data=>{
      this.TypeList=data;
      console.log(data)
    });

    this._service.getSafetcyItem().subscribe(data=>{
      this.SafetyItems=data;
    });
  }
 
  addNewChecklist(){
    if(this.form.valid){
      let payload:any;

      payload['Id'] = this.form.get('id')?.value;

      //Processes Safety Items 
      let SafetyItemsIds = this.form.get('Id')?.value as [];
      let listOfSafetyItems:any[] = [];
      SafetyItemsIds.forEach((element: any) => {
       let safetyItemObj:any = {};
       safetyItemObj['ID'] = element as number;
       listOfSafetyItems.push(safetyItemObj);
      });

      payload['SafetyItems'] = listOfSafetyItems;
      this._service.addProjectChecklist(payload).subscribe(res=>{
        console.log(res)
      })

    }

  }
  closeAlert() {
    this.alert = false;
  }
  back(){
    this.route.navigateByUrl("project")
  }
}
