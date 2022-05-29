import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-supplier-type',
  templateUrl: './update-supplier-type.component.html',
  styleUrls: ['./update-supplier-type.component.css']
})
export class UpdateSupplierTypeComponent implements OnInit {

  Id!: string;
  Name1: any;
  public supplierTypeFrm!: FormGroup;
  alert: boolean = false;
  @Input() type: any;
  


  constructor(private service: ServiceService, private routed: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    this.supplierTypeFrm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
    })

    this.Id = this.type.suppliertypeId;
    this.Name1 = this.type.name;

  }


  updateSupplierT(){
    var id = this.type.suppliertypeId;
    var val = {Name : this.Name1};
    this.service.editSupplierType(id, val).subscribe((res: { toString: () => any; }) => {alert(res.toString());});
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.supplierTypeFrm.controls[controlName].hasError(errorName);
  }

}
