
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { project, ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {

  Description: any;
  Project: any;
  public incidentFrm!: FormGroup;
  alert: boolean = false;
  ProjectList : project[] = [];

  constructor(private service: ServiceService, private formB: FormBuilder, private route: Router, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.incidentFrm = new FormGroup({
      Description: new FormControl('', [Validators.required, Validators.maxLength(100),  Validators.pattern("[A-Za-z ]{1,25}")]),
      ProjectID : new FormControl('', [Validators.required])
    });
    this.service.getProject().subscribe(data=>{
      this.ProjectList=data;
      console.log(this.ProjectList);
      
  })
}

  addIncident() {

    if (this.incidentFrm.valid) {
    this.service.addIncident(this.incidentFrm.value).subscribe(res => {
      if (confirm('Are you sure you want to Add this Incident?')) {
        this._snackbar.open("Success, you have Add a Incident!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      }
      else{
        this._snackbar.open("Unsuccessful", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      }
    });

    this.Description = '';
    console.log(this.incidentFrm.value);
   
    }
  }

  

  back(){
    this.route.navigateByUrl("incident")
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.incidentFrm.controls[controlName].hasError(errorName);
  }


}
