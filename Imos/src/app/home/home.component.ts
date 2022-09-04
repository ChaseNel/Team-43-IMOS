import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) { }

  employee() {
    this.route.navigateByUrl("/employee");
  }

  
  material() {
    this.route.navigateByUrl("/material");
  }

  supplier() {
    this.route.navigateByUrl("/supplier");
  }
  user() {
    this.route.navigateByUrl("/user");

  }

  incident() {
    this.route.navigateByUrl('/incident')
  }

  clients() {
    this.route.navigateByUrl('/client')
  }

  warehouses() {
    this.route.navigateByUrl('/warehouse')
  }

  equipment() {
    this.route.navigateByUrl('/equipment')
  }

  projects() {
    this.route.navigateByUrl('/project')
  }

  vehicle() {
    this.route.navigateByUrl('/vehicle')
  }
  saftyCheclist(){
    this.route.navigateByUrl('/saftyChecklist')
  }
 reports(){
    this.route.navigateByUrl('/Allreports')
  }


  ngOnInit(): void {
  }
}
