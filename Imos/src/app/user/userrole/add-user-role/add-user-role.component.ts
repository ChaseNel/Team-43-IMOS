import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {

  constructor( private service: ServiceService, private formB: FormBuilder) {

   }
   alert: boolean = false;
   Description: any;
   public userRoleFrm!: FormGroup;

  ngOnInit(): void {
    this.userRoleFrm = new FormGroup({
      Description: new FormControl('', [Validators.required]),
    });
  }

  addRole() {
    var val = { Description: this.Description }
    this.service.addUserRole(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.Description = '';
    console.log(val);
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.userRoleFrm.controls[controlName].hasError(errorName);
  }
}
