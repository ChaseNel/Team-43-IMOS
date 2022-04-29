import { PopUpComponent } from './pop-up/pop-up.component';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(PopUpComponent);
  }

  ngOnInit(): void {
  }

}

