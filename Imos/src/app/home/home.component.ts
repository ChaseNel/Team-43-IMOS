import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  backgroundUrl = "./../../assets/Untitled Diagram.jpg"
  constructor(private route: Router) { }



  employee() {
    this.route.navigateByUrl("/employee");
  }

  BackUp() {
    this.route.navigateByUrl("/BackUp");
  }

  HelpView() {
    this.route.navigateByUrl("/HelpView");
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
 Reports(){
    this.route.navigateByUrl('/Allreports')
  }

  reports(){
    this.route.navigateByUrl('/reports')
  }

  ngOnInit(): void {
  }
}
