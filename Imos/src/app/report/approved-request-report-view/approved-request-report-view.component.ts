import { material } from './../../services/service.service';

import { ChartData, ChartOptions} from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService,requestcount } from 'src/app/services/service.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import jspdf from 'jspdf';

//import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { elementAt, map } from 'rxjs/operators';
@Component({
  selector: 'app-approved-request-report-view',
  templateUrl: './approved-request-report-view.component.html',
  styleUrls: ['./approved-request-report-view.component.css']
})
export class ApprovedRequestReportViewComponent implements OnInit {

  chartsLoaded:boolean = false;
  ApprovedCount:any[] = []

  materials:any[] = []

  tableData: any;
  created = false;
  grandAverage: any;
  grandTotal: any;
  averages: any[] = [];
  sumQuantity: any[] =[];
  reportInfo:any[] = [];

  displayedColumns: string[] = ['RequestDate', 'ApprovedDate', 'RequestedQuantity'];
  dataSource = new MatTableDataSource<any>(this.materials);
  @ViewChild('htmlData') htmlData!:ElementRef;

  constructor(private snackBar: MatSnackBar,
    private service: ServiceService) { }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort = new MatSort();


    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }


    ApprovedCountData:ChartData<'pie'> ={
      labels: [],
      datasets: [
        { data: [],
          backgroundColor: ['rgb(105,105,105)',
           'rgb(0, 255, 0)','rgb(22, 99, 200)'
           ,'rgb(255, 0, 0)','rgb(159, 22, 128)',
           'rgb(255,215,0)'

          ]

        },

      ],
    };

    ApprovedCountOptions: ChartOptions = {
      responsive: true,
      plugins: {
        title: {
          display:true,
          text:'# Approved Material Request By Client/Project',
        },
      },
    };



    MaterialCompData:ChartData<'bar'> ={
      labels: [],
      datasets: [
        { data: [],
          backgroundColor: ['rgb(105,105,105)',
           'rgb(0, 255, 0)','rgb(22, 99, 200)'
           ,'rgb(255, 0, 0)','rgb(159, 22, 128)',
           'rgb(255,215,0)'

          ]

        },

      ],
    };


    MaterialCompOptions: ChartOptions = {
      responsive: true,
      plugins: {
        title: {
          display:true,
          text:'# Total Material In Material Request ',
        },
      },
    };


    CompileRequestCountDashboard()
    {

      let averages: number[] =  [];
      let sumQuantity: number[] =  [];
      let materials: any[] =  [];
      let tableData: any[]=[];
      const counts: any[] =  [];


      this.service.getApprovedRequestCount()
      .subscribe(result => {

        console.log(result)

        result.forEach((element: { clientName: string; count: number; }) => {
          this.ApprovedCountData.labels?.push(element.clientName)
          this.ApprovedCountData.datasets[0].data.push(element.count)
        });

        this.chartsLoaded = true;

      }, (reponsive: HttpErrorResponse) => {
        if (reponsive.status === 500){
          this.snackBar.open(reponsive.error, 'X', {duration:5000})
        }
      })


      this.service.getMaterialCompositonCount()
      .subscribe(result => {

        console.log(result)

        result.forEach((element: { materialName: string;  materialTotal:number;}) => {
          this.MaterialCompData.labels?.push(element.materialName)
          this.MaterialCompData.datasets[0].data.push(element.materialTotal)
        });

        this.chartsLoaded = true;

      }, (reponsive: HttpErrorResponse) => {
        if (reponsive.status === 500){
          this.snackBar.open(reponsive.error, 'X', {duration:5000})
        }
      })

      this.service.getMaterialRequestControls()
      .subscribe(result =>{

        averages = result.reportData.map((x: { AverageQuantityRequested: any; }) =>x.AverageQuantityRequested);

        sumQuantity = result.reportData.map((x: { ToTalQuantity: any; }) =>x.ToTalQuantity);

        materials = result.reportData.map((x: { MaterialName: any; }) =>x.MaterialName);

        //tableData = result.reportData.map( (x: { MaterialRequests: any; }) => x.MaterialRequests)

        result.reportData.forEach((element: any) =>
        {
          tableData.push(element)
        });

        this.tableData = tableData;
       // this.generateTables(result);
       console.log(this.tableData)
      })





    }


    getGrandAverage() {
      const len = this.averages.length;
      let sum = 0;

      sum = this.averages.reduce((acc, current) => acc + current);
      this.grandAverage = Math.round(sum / len)  ;
    }

    getGrandATotal() {
      const len = this.sumQuantity.length;
      let sum = 0;

      sum = this.sumQuantity.reduce((acc, current) => acc + current);
      this.grandTotal = Math.round(sum)  ;
    }



    generateTables(result:any){
      this.tableData = result.reportData.map((x: { MaterialRequests: any; })=>x.MaterialRequests);
      this.averages = result.reportData.map((x: { AverageQuantityRequested: any; }) => x.AverageQuantityRequested);
      this.sumQuantity = result.reportData.map((x: { ToTalQuantity: any; }) => x.ToTalQuantity);
      this.getGrandAverage();
      this.getGrandATotal();

      console.log(this.tableData)
    }


    public downloadPDF(): void {
      let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jspdf('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'JPEG', 0, position, fileWidth, fileHeight);
        PDF.save('Request_Count_Per_Client/Project.pdf');
      });
    }




  ngOnInit(): void {

    this.CompileRequestCountDashboard()
  }

}
