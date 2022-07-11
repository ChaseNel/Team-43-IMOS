import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-task-type',
  templateUrl: './add-task-type.component.html',
  styleUrls: ['./add-task-type.component.css']
})
export class AddTaskTypeComponent implements OnInit {

  Description: any;
  public taskTypeFrm!: FormGroup;
  alert: boolean = false;

  constructor(private service: ServiceService, private formB: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.taskTypeFrm = new FormGroup({
      Description: new FormControl('', [Validators.required])
    })
  }

  addTasktype() {
    var val = {Description: this.Description }
    this.service.addTaskType(val).subscribe((res: { toString: () => any; }) => { alert(res.toString()); });
    this.Description = '';
    console.log(val);
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }

  back(){
    this.route.navigateByUrl("tasktype")
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.taskTypeFrm.controls[controlName].hasError(errorName);
  }

}
