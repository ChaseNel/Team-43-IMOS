import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {

  alert: boolean = false;
  Description: any;
  public userRoleFrm!: FormGroup;

  constructor( private service: ServiceService, private formB: FormBuilder, private _snackbar: MatSnackBar) {

   }

  ngOnInit(): void {
    this.userRoleFrm = new FormGroup({
      Description: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z ]{1,15}"), Validators.maxLength(25)]),
    });
  }
  back(){
    
  }

  addRole() {

    if (this.userRoleFrm.valid) {
      console.log(this.userRoleFrm.value);

    var val = this.userRoleFrm.controls['Description'].value;
    this.service.addUserRole(val).subscribe(res => {
      if (confirm('Are you sure you want to Add this Supplier Type?')) {
        this._snackbar.open("Success, you have Add a Supplier Type!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
     
      }
      else{
        this._snackbar.open("Unsuccessful", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      }
    });
    } 
  }

  
  public hasError = (controlName: string, errorName: string) => {
    return this.userRoleFrm.controls[controlName].hasError(errorName);
  }
}
