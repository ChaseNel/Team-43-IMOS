import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unsuccessful',
  templateUrl: './unsuccessful.component.html',
  styleUrls: ['./unsuccessful.component.css']
})
export class UnsuccessfulComponent implements OnInit {

  constructor(private dialogRef : MatDialog) { }

  Close(){
    this.dialogRef.closeAll;
  }

  ngOnInit(): void {
  }

}
