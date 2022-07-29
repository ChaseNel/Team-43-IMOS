import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {

  Description: any;
  public incidentFrm!: FormGroup;
  alert: boolean = false;

  constructor(private service: ServiceService, private formB: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.incidentFrm = new FormGroup({
      Description: new FormControl('', [Validators.required])
    })
  }

  addIncident() {

    if (confirm('Are you sure you want to add this Incident?')){
    var val = { Description: this.Description }
    this.service.addIncident(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.Description = '';
    console.log(val);
    this.alert = true;
    }
  }

  closeAlert() {
    this.alert = false;
  }

  back(){
    this.route.navigateByUrl("incident")
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.incidentFrm.controls[controlName].hasError(errorName);
  }


}
