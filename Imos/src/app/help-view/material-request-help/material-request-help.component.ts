import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-request-help',
  templateUrl: './material-request-help.component.html',
  styleUrls: ['./material-request-help.component.css']
})
export class MaterialRequestHelpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  users: any[] = [
    { name: ' 1. Add '},
     { name: '2. Update ' },
     { name: '3. Delete' },
     { name: '4. Search' },


    ];
  userFilter: any = { name: '' };



}