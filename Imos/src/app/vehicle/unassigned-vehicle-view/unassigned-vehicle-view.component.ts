

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-unassigned-vehicle-view',
  templateUrl: './unassigned-vehicle-view.component.html',
  styleUrls: ['./unassigned-vehicle-view.component.css']
})
export class UnassignedVehicleViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
