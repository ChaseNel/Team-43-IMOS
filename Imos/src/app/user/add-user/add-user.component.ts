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
      userRoleId: ['', [Validators.required]]
    })
    this._service.getUserRole().subscribe(data=> {
      this.roleList = data;
    });
    this._service.getEmployees().subscribe(data => {
      this.employeeList = data;
    })
  }
  addUser(){
    if(this.addForm.valid){
      console.log(this.addForm.value);
       this._service.registerUser(this.addForm.value)
       .subscribe(res=>{
       console.log(res);
       // add validation and "are you sure to add supplier notification"
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

