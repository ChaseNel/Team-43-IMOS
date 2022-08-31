import { user, employee } from './../../services/service.service';
//import { Employee } from './../../employee/employee.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService, userrole, } from 'src/app/services/service.service';
import { CommonModule } from '@angular/common'
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public addForm: FormGroup;
  alert: boolean = false;
  roleList: userrole[] = [];
  employeeList: employee[] = [];
  posts: any;

  constructor(private fb: FormBuilder,
    private _service: ServiceService,
    private route: Router) {
  }

  ngOnInit(): void {
    this.buildAddForm(); 
  }

  private buildAddForm() {
    this.addForm = this.fb.group({
      employeeId: ['', [Validators.required]],
      username: ['', [Validators.required]],
      id: ['', [Validators.required]]
    })

    this._service.getUserRole().subscribe(data=> {
      this.roleList = data;
      console.log(data);
    });
    this._service.getEmployees().subscribe(data => {
      this.employeeList = data;
    })
  }

  addUser(){
        // add validation and "are you sure to add user notification"
    if(this.addForm.valid){
      let payload:any = {};
      payload['EmployeeId'] = this.addForm.get('employeeId')?.value;
      payload['Username'] = this.addForm.get('username')?.value;
      payload['UserroleId'] = this.addForm.get('id')?.value;
      console.log(payload);
    this._service.registerUser(payload)
       .subscribe(res=>{
        console.log(res)
       })
    }
  }
 
  back(){
    this.route.navigateByUrl("user")
  }
  closeAlert() {
    this.alert = false;
  }
}

