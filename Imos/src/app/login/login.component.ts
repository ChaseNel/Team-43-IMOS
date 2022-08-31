import { HttpClient } from '@angular/common/http';
import { user } from 'src/app/services/service.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  readonly Root_URL = 'https://localhost:5001/api'

  hide:any;
  showAuthenticationError: boolean = false;
  authenticationError: string = "";
  data: user[] = [];

  loginForm!:FormGroup; 

  constructor(
    private fb: FormBuilder, private router: Router, private _service: ServiceService
   /* private _AuthService:AuthService*/ ,private http:HttpClient) 
    { 
    
    }  
  LogIn(){
    if(this.loginForm.valid){
      let payload:any={};
      payload['UserName'] =this.loginForm.value.username;
      payload['Password'] =this.loginForm.value.userPassword;
      console.log(payload)
      this._service.userLogin(payload).subscribe(res=>{
        alert("Login Success!!");
        this.router.navigate(['home']);
      })
  }
}

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username: [null, [Validators.required]],
      userPassword: [null, [Validators.required]]
    });
    localStorage.clear();
  }
  /*
  DYy9$a2F  */

}
