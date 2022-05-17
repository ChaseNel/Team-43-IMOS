import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeForm: FormGroup = new FormGroup({
  })

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }



  createEmployee() {

  }

  ngOnInit(): void {
    this.addEmployeeForm = this.formBuilder.group({
      'name': new FormControl(''),
      'email': new FormControl(''),
      'contact': new FormControl(''),
      'document': new FormControl('')
    })
  }

}
