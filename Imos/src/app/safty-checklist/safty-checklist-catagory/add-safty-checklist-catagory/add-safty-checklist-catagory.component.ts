import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-safty-checklist-catagory',
  templateUrl: './add-safty-checklist-catagory.component.html',
  styleUrls: ['./add-safty-checklist-catagory.component.css']
})
export class AddSaftyChecklistCatagoryComponent implements OnInit {

  categoryName:any;
  SafetyCategoryFrm: FormGroup;
  alert: boolean = false;

  constructor(private _service: ServiceService, private fb:FormBuilder,private route: Router) { 

  }

  ngOnInit(): void {
    this.SafetyCategoryFrm = new FormGroup({
      categoryName: new FormControl('', [Validators.required])
  });
  }
  addCategoryType(){
    /*var val = { Name: this.categoryName}
    this._service.addSafetyCategory(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.categoryName = '';
    console.log(val);
    this.alert = true;*/
  }
  closeAlert() {
    this.alert = false;
  }

  back(){
    this.route.navigateByUrl("saftyChecklistCatagory")
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.SafetyCategoryFrm.controls[controlName].hasError(errorName);
  }
}
