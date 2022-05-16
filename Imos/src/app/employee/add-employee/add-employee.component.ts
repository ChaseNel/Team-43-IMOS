import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private service: ServiceService) { }

  Name: any;
  Email: any;
  ContactNumber: any;
  public employeeFrm!: FormGroup;

  ngOnInit(): void {

    this.employeeFrm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      ContactNumber: new FormControl('', [Validators.required ,Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
    }
    );
    
   
  }



  addEmployee(){
    var val = {Name: this.Name, Email: this.Email, ContactNumber: this.ContactNumber}
    this.service.addEmployee(val).subscribe((res: { toString: () => any; }) => {alert(res.toString());});
    console.log(val);
    }


    public hasError = (controlName: string, errorName: string) =>{
      return this.employeeFrm.controls[controlName].hasError(errorName);
  }



    


}
