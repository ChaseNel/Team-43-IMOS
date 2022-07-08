import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { materialType, ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {

  Type: any;
  Name: any;
  Description: any;
  public materialFrm!: FormGroup;
  alert: boolean = false;
  typelist: materialType[] = [];

  constructor(private service: ServiceService, private formB: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.materialFrm = new FormGroup({
      Type: new FormControl('', [Validators.required]),
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required])
    })
    this.service.getMaterialType().subscribe(x => { this.typelist = x; console.log("typelist", this.typelist) });
  }

  addMaterial() {
    var val = {Type: this.Type, Name: this.Name, Description: this.Description }
    this.service.addMaterial(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.Type = '';
    this.Name = '';
    this.Description = '';
    console.log(val);
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }

  back(){
    this.route.navigateByUrl("material")
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.materialFrm.controls[controlName].hasError(errorName);
  }

}
