import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-incident',
  templateUrl: './update-incident.component.html',
  styleUrls: ['./update-incident.component.css']
})
export class UpdateIncidentComponent implements OnInit {

  Id!: string;
  Description1: any;
  public incidentFrm!: FormGroup;
  alert: boolean = false;
  @Input() type: any;
  


  constructor(private service: ServiceService, private routed: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    this.incidentFrm = new FormGroup({
      Description: new FormControl('', [Validators.required])
    })
    this.Id = this.type.incidentId;
    this.Description1 = this.type.description;

  }

  updateIncident(){

    if (confirm('Are you sure you want to update this Incident?')){
    var id = this.type.incidentId;
    var val = {Description: this.Description1};
    this.service.editIncident(id, val).subscribe((res: { toString: () => any; }) => {alert(res.toString());});
    this.alert = true;
    }
  }

  closeAlert() {
    this.alert = false;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.incidentFrm.controls[controlName].hasError(errorName);
  }


}
