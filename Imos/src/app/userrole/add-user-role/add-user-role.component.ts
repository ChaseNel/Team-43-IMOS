import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {

  constructor( private service: ServiceService, private formB: FormBuilder) { }

  Description: any;
  public userRoleFrm!: FormGroup;

  ngOnInit(): void {
  }

}
