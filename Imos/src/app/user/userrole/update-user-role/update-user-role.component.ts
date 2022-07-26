import { UserRoleService } from '../../../services/administration/user-role.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user-role',
  templateUrl: './update-user-role.component.html',
  styleUrls: ['./update-user-role.component.css']
})
export class UpdateUserRoleComponent implements OnInit {
  
  Description: any;
  public userRoleFrm!: FormGroup;
  hide: boolean = false;
  

  constructor( private UserRoleService:UserRoleService,private fb:FormBuilder) { }

  ngOnInit(): void {
    
    this.userRoleFrm = new FormGroup({
      Description: new FormControl('', [Validators.required]),
    }
    );
  }

  updateUserRole( ){
    
    this.hide= true;
   }
   public hasError = (controlName: string, errorName: string) =>{
    return this.userRoleFrm.controls[controlName].hasError(errorName);
}

closeAlert(){
  this.hide = false;
}

}
