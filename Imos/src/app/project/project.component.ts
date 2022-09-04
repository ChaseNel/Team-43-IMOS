
import { map } from 'rxjs/operators';


import {  ProjectMaterialRequest } from './../services/service.service';
import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { project, ServiceService, constructionSite, request } from './../services/service.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProjectMaterialRequestComponent} from './project-material-request/project-material-request.component'

import {
  ChangeDetectionStrategy,

  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  startOfMonth,
  startOfWeek,
  endOfWeek,
format,

} from 'date-fns';
import { Subject, Observable } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { HttpParams } from '@angular/common/http';
import { colors } from '../demo-utils/colors';








function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  template:' {{data.id}}',
})
export class ProjectComponent implements OnInit {
//calendar settings
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;


  viewDate: Date = new Date();

  endDate: Date = new Date();

  events$: Observable<CalendarEvent<{requestList:ProjectMaterialRequest}>[]>

  activeDayIsOpen: boolean = false;


  refresh = new Subject<void>();










  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

//calendar settings






  // API Test
  info: project[] = [];

  displayedColumns: string[] = ['project', 'construction', 'iRequest','saftyfile', 'actions'];

  dataSource!: MatTableDataSource<project>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  posts: any;
  sitelist: constructionSite[] = [];
  reqlist: request[] = [];

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:{id:number},
    private route: Router,
    private service: ServiceService,
     private _snackBar: MatSnackBar) {
    this.GetAllProjects();
  }


  ngOnInit(): void {
    //this.service.getMaterialType().subscribe(x => { this.typelist = x; console.log("typelist", this.typelist) });
    this.fetchEvents();
    this.service.getConstructionSite().subscribe(x => {this.sitelist = x; console.log("Sitelist" , this.sitelist)});
    this.service.getRequeast().subscribe(x => {this.reqlist = x; console.log("reqlist" , this.reqlist)});

  }
  fetchEvents(): void
  {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    const params = new HttpParams()
    .set(
      'primary_release_date.gte',
      format(getStart(this.viewDate), 'yyyy-MM-dd')
    )
    .set(
      'primary_release_date.lte',
      format(getEnd(this.endDate), 'yyyy-MM-dd')
    )

    .set('api_key', '0ec33936a68018857d727958dca1424f');

    this.events$ = this.service.getMaterialRequest()
    .pipe(
      map(({ results }:{ results: ProjectMaterialRequest[] }) =>{
        console.log(results)

        return results.map((requestList: ProjectMaterialRequest) =>{
          return {
            title : requestList.statusName,

            start: new Date(

              requestList.requestDate + getTimezoneOffsetString(this.viewDate)

            ),

            end: new Date(
              requestList.statusUpdateDate + getTimezoneOffsetString(this.endDate)
            ),

            colors:colors.yellow,
            allDay: true,
            meta:{
              requestList,
            },

          };
        });

      })
    );
  }


  dayClicked({
    date,
    events
  }:{
    date:Date;
    events: CalendarEvent<{requestList: ProjectMaterialRequest}>[];
  }): void
  {

    if(isSameMonth(date,this.viewDate)){

      if(
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen ===true) ||
        events.length === 0
        )
        {
          this.activeDayIsOpen = false;
        }
        else{
          this.activeDayIsOpen = true;
        this.viewDate = date;
        }

    }
  }

  eventClicked(event: CalendarEvent<{requestList: ProjectMaterialRequest}>): void{

  }



  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ProjectMaterialRequestComponent, {
      data:{id},
      width: '80%',
      height:'90%'
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(id);
      this.GetAllProjects();

    });
  }


  GetAllProjects() {
    this.service.getProject().subscribe(x => {
      this.info = x;
      console.log(this.data);
      this.posts = x;

      this.dataSource = new MatTableDataSource(this.posts)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.data);

    })
  }

  applyFilter(event: Event) {
    const FilterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = FilterValue.trim().toLocaleLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  UpdateProject(id:number) {
    this.route.navigateByUrl('/updateProject/' + id)
  }

  addProject() {
    this.route.navigateByUrl('/addProject')
  }

  deleteProject(id: number) {
    console.log(id);
    if (confirm('Are you sure you want to delete this Project?')) {
      this.service.deleteProject(id).subscribe(res => {
        this.GetAllProjects();
        this._snackBar.open("Success, you have deleted a Project!", 'OK', {
          duration: 3000,
          verticalPosition: 'bottom',
        });
      });
    }
  }

  deliveryNote(){
    this.route.navigateByUrl('DeliveryNote');
  }

ViewRequests(){

this.service.getMaterialRequest()
.subscribe(result => {

  result.forEach((element: { results: CalendarEvent<any>; }) => {

    //this.events..push(element.results)

  });

  console.log(this.events$)
})

}




}
