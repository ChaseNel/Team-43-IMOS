import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-check-list',
  templateUrl: './add-check-list.component.html',
  styleUrls: ['./add-check-list.component.css']
})
export class AddCheckListComponent implements OnInit {

  toppings = this._formBuilder.group({
    //get all of the items
  });
  panelOpenState = false;

  constructor(private _formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
  }

  cancel(){
    this.route.navigateByUrl("saftyChecklist");
  }

  add(){

  }

}
