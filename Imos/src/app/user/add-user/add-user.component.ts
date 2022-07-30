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

  }
 
  back(){
    this.route.navigateByUrl("material")
  }
  closeAlert() {
    this.alert = false;
  }
}

