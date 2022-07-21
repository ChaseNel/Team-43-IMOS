import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-task-type',
  templateUrl: './update-task-type.component.html',
  styleUrls: ['./update-task-type.component.css']
})
export class UpdateTaskTypeComponent implements OnInit {

  Id!: string;
  Name1: any;
  Description1: any;
  public taskTypeFrm!: FormGroup;
  alert: boolean = false;
  @Input() type: any;
  


  constructor(private service: ServiceService, private routed: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    this.taskTypeFrm = new FormGroup({
      Description: new FormControl('', [Validators.required])
    })
    this.Id = this.type.tasktype1;
    this.Description1 = this.type.description;

  }

  updateTaskT(){
    var id = this.type.tasktype1;
    var val = { Description: this.Description1};
    this.service.editTaskType(id, val).subscribe((res: { toString: () => any; }) => {alert(res.toString());});
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.taskTypeFrm.controls[controlName].hasError(errorName);
  }

}
