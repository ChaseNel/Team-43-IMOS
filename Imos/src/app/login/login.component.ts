import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private formBuilder:FormBuilder) { }

  LoginForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get loginform(){
    return this.LoginForm.controls
  }

  login(){
    console.log('Login values are: ', this.LoginForm.value);
  }
  
  ngOnInit(): void {
  }

}
