import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { constructionSite, request, ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  SiteList: constructionSite[] = [];
  projectfrm: FormGroup;
  alert: boolean = false;
  requestList: request[] = [];

  constructor(private service: ServiceService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.buildAddForm();
  }
  private buildAddForm(){
    this.projectfrm=this.fb.group({
      name: ['', [Validators.required]],
      constructionsiteId: ['', [Validators.required]],
      initialrequestId: ['', [Validators.required]]
    });
    this.service.getConstructionSite().subscribe(data=>{
      this.SiteList=data;
    });
    this.service.getRequeast().subscribe(data=>{
  this.requestList=data;
});
  }
  addProject() {
    if(this.projectfrm.valid){
      console.log(this.projectfrm.value);
       this.service.addProject(this.projectfrm.value)
       .subscribe(res=>{
       console.log(res);
       // add validation and WarehouseTypes "are you sure to add supplier notification"
       })
    }
   
 
  }

  closeAlert() {
    this.alert = false;
  }

  get formdet(){
    return this.projectfrm.controls;
}

  back(){
    this.route.navigateByUrl("project")
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.projectfrm.controls[controlName].hasError(errorName);
  }


}
