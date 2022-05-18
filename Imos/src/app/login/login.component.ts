import { user } from './../services/service.service';
import { UnsuccessfulComponent } from './Dialogs/unsuccessful/unsuccessful.component';
import { PopUpComponent } from './../logout/pop-up/pop-up.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormControl, NgForm, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loggedIn: boolean | undefined;
  data: user[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private service: ServiceService, 
    private route: Router,
    private diologRef: MatDialog
    ) { }

  LoginForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get loginform() {
    return this.LoginForm.controls
  }

  login() {
    let userName = "Chase3325";
    let password = "123456789";

    if (this.LoginForm.controls["username"].value == userName
     && this.LoginForm.controls["password"].value == password) {
      this.loggedIn = true
      console.log('yes');
      this.route.navigateByUrl("/home");
    }
    else if(this.LoginForm.controls["username"].value == userName && this.LoginForm.controls["password"].value !== password)
    {
      this.loggedIn = false
      this.diologRef.open(UnsuccessfulComponent)
      console.log("wrong p");
    }
    else {
      this.loggedIn = false
      console.log('No');
    }

    console.log('Login values are: ', this.LoginForm.value);
  }

  onLogin(LoginForm: FormGroup) {
    //console.log(LoginForm.value)

  }

  log(){
    this.service.getUser().subscribe(x =>{
      this.data = x;
      console.log(this.data);
    });
  }

  ngOnInit(): void {

  }

}
