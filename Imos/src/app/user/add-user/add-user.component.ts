import { user, employee } from './../../services/service.service';
//import { Employee } from './../../employee/employee.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService, userrole, } from 'src/app/services/service.service';
import { CommonModule } from '@angular/common'
import { HttpEventType } from '@angular/common/http';

export interface UserRole {
  userrole: number,
  description: string
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public addForm!: FormGroup;

  listOfUserRoles: any;
  data: userrole[] = [];
  employee: employee[] = [];
  posts: any;

  constructor(private fb: FormBuilder,
    private _serviceManage: ServiceService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.buildAddForm();

    this._serviceManage.getUserRole().subscribe(x => {
      this.data = x;
      console.log(this.data)
      this.posts = x
    });


    this._serviceManage.getEmployees().subscribe(y => {
      this.employee = y;
      console.log(this.employee)

    })
  }

  private buildAddForm() {
    this.addForm = this.fb.group({
      userRole: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      userPassword: ['', [Validators.required]],
      employeeId: ['', [Validators.required]]
    });
  }

  onAddSubmit(): void {

    if (this.addForm.valid) {

      /*  this._serviceManage.addUser(this.addForm.value)*/

      this._serviceManage.addUser(this.addForm.value)
        .subscribe(event => {
          if (event.type === HttpEventType.Response) {
            this.router.navigateByUrl('/user')
            console.log(this.addForm.value)
          }
        },
          error => {
            console.log("error did not send data");
            console.log(this.addForm.value)
          })

      return console.log()

    };
    /* this._serviceManage.getUserRole().subscribe((data:any)=>{
       this.listOfUserRoles=data;
       console.log(data);
     });*/


  }

  createUser() {
    const user: user = this.addForm.value;
    this._serviceManage.addUser(user)

  }


  private getUserRoles() {
    this._serviceManage.getUserRole()
  }

  changeUserRole(e: any) {

    console.log(e.target.value)
    this.addForm.patchValue({
      userRole1: e.target.value
    })
  }

  changeEmployee(e: any) {
    this.addForm.patchValue({
      employeeId: e.target.value
    })
  }


}

