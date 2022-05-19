import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceService, userrole, user} from 'src/app/services/service.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';





@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {


  updateForm!: FormGroup;


  constructor(private fb: FormBuilder, private serviceManage: ServiceService, private router:Router) { }

  ngOnInit(): void {

    this.buildUpdateFormWithEmptyFields();
  }


  private buildUpdateFormWithEmptyFields() {
    this.updateForm = this.fb.group({
     /* Name: ['', [Validators.required]],*/

      userId: [''],
      userRole: ['',[Validators.required]],
      userName: ['',[Validators.required]],
      userPassword: ['',[Validators.required]],
      employeeId: ['', [Validators.required]]

    });
  }


  private buildUpdateForm(role: user) {
    this.updateForm = this.fb.group({
     /* Name: [role.name, [Validators.required]],*/

      Id: [role.userId]
    });
  }

  onUpdateSubmit(): void {
    if (this.updateForm.valid){
      let updateId = this.updateForm.get('userId')?.value as number;
      this.serviceManage.updateUser
    }
  }


}
