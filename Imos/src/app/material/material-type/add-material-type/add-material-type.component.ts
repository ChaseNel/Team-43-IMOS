import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-material-type',
  templateUrl: './add-material-type.component.html',
  styleUrls: ['./add-material-type.component.css']
})
export class AddMaterialTypeComponent implements OnInit {

  Name: any;
  Description: any;
  public materialTypeFrm!: FormGroup;
  alert: boolean = false;

  constructor(private service: ServiceService, private formB: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.materialTypeFrm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required])
    })
  }

  addMaterialT() {
    var val = { Name: this.Name, Description: this.Description }
    this.service.addMaterialType(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.Name = '';
    this.Description = '';
    console.log(val);
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }

  back(){
    this.route.navigateByUrl("materialtype")
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.materialTypeFrm.controls[controlName].hasError(errorName);
  }

}

