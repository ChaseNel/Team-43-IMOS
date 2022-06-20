
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { UntypedFormGroup, FormBuilder, UntypedFormControl, Validators  } from '@angular/forms';


@Component({
  selector: 'app-update-user-role',
  templateUrl: './update-user-role.component.html',
  styleUrls: ['./update-user-role.component.css']
})
export class UpdateUserRoleComponent implements OnInit {

  Id: any;
  Description: any;
  public userRoleFrm!: UntypedFormGroup;
  hide: boolean = false;
  alert: boolean = false;
  @Input()type: any;
  

  constructor( private service: ServiceService) { }

  ngOnInit(): void {

    this.userRoleFrm = new UntypedFormGroup({
      Description: new UntypedFormControl('', [Validators.required]),
    }
    );

    this.Id = this.type.materialtypeId;
    this.Description = this.type.description;

    
  }
 updateUserRole(){

  var id = this.type.userrole1;
    var val = {Description: this.Description};
    this.service.editUserRole(id, val).subscribe((res: { toString: () => any; }) => {alert(res.toString());});
    this.alert = true;

 }

  


  public hasError = (controlName: string, errorName: string) =>{
    return this.userRoleFrm.controls[controlName].hasError(errorName);
}

closeAlert(){
  this.alert = false;
}

}
