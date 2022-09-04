import { materialtype, constructionSite } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  ConstructionSite: constructionSite[] = [];
  Site: any;
  Req: any;
  SaftyFile: any;
  public projectfrm!: FormGroup;
  alert: boolean = false;
  //typelist: materialType[] = [];

  constructor(private service: ServiceService, private formB: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.projectfrm = new FormGroup({
      Site: new FormControl('', [Validators.required]),
      Req: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      SaftyFile: new FormControl('', [Validators.required])
    })
    this.service.getConstructionSite().subscribe(x => { this.ConstructionSite = x; console.log("ConstructionSite", this.ConstructionSite) });
  }

  addProject() {
    var val = {Type: this.Site, Name: this.Req, Description: this.SaftyFile }
    this.service.addProject(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.Site = '';
    this.Req = '';
    this.SaftyFile = '';
    console.log(val);
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }

  get formdet(){
    return this.projectfrm.controls;
}

  back(){
    this.route.navigateByUrl("project")
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.projectfrm.controls[controlName].hasError(errorName);
  }

}
