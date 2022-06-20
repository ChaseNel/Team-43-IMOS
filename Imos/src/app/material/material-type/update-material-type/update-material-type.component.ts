import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-material-type',
  templateUrl: './update-material-type.component.html',
  styleUrls: ['./update-material-type.component.css']
})
export class UpdateMaterialTypeComponent implements OnInit {

  Id!: string;
  Name1: any;
  Description1: any;
  public materialTypeFrm!: UntypedFormGroup;
  alert: boolean = false;
  @Input() type: any;
  


  constructor(private service: ServiceService, private routed: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    this.materialTypeFrm = new UntypedFormGroup({
      Name: new UntypedFormControl('', [Validators.required]),
      Description: new UntypedFormControl('', [Validators.required])
    })
    this.Id = this.type.materialtypeId;
    this.Name1 = this.type.name;
    this.Description1 = this.type.description;

  }

  updateMaterialT(){
    var id = this.type.materialtypeId;
    var val = {Name : this.Name1, Description: this.Description1};
    this.service.editMaterialType(id, val).subscribe((res: { toString: () => any; }) => {alert(res.toString());});
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.materialTypeFrm.controls[controlName].hasError(errorName);
  }

}
