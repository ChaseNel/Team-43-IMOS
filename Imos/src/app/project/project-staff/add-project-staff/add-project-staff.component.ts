import { employee, project, ServiceService } from 'src/app/services/service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project-staff',
  templateUrl: './add-project-staff.component.html',
  styleUrls: ['./add-project-staff.component.css']
})
export class AddProjectStaffComponent implements OnInit {
  
  form:FormGroup;
  TypeList:project[]=[];
  EmployeeTypes:employee[]=[];
  alert: boolean = false;

  constructor(private fb: FormBuilder,
    private _service:ServiceService,private route: Router)
   {

   }

  ngOnInit(): void {
    this.buildAddForm();
  }
  private buildAddForm(){
    this.form=this.fb.group({
      employeeId: ['', [Validators.required]],
      projectId: ['', [Validators.required]]
     
     
    })
    this._service.getProject().subscribe(data=>{
      this.TypeList=data;
    });
    this._service.getEmployees().subscribe(data=>{
      this.EmployeeTypes=data;
    });
  }

  AddStaff(){
    if(this.form.valid){
      console.log(this.form.value)
      this._service.addProjectEmployee(this.form.value)
      .subscribe(res=>{
        //add validation and "are you sure to add equipment  notification"
      })
  }
}
  back(){
    this.route.navigateByUrl("project")
  }

  closeAlert() {
    this.alert = false;
  }
}
