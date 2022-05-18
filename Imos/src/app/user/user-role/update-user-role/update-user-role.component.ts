
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';


@Component({
  selector: 'app-update-user-role',
  templateUrl: './update-user-role.component.html',
  styleUrls: ['./update-user-role.component.css']
})
export class UpdateUserRoleComponent implements OnInit {

  
  Description: any;
  public userRoleFrm!: FormGroup;
  hide: boolean = false;
  

  constructor( private service: ServiceService) { }

  ngOnInit(): void {

    this.userRoleFrm = new FormGroup({
      Description: new FormControl('', [Validators.required]),
    }
    );

    
  }
 updateUserRole(){

  this.hide= true;

 }

  


  public hasError = (controlName: string, errorName: string) =>{
    return this.userRoleFrm.controls[controlName].hasError(errorName);
}

closeAlert(){
  this.hide = false;
}

}
