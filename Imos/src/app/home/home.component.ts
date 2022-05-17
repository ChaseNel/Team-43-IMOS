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

  user() {
    this.route.navigateByUrl("/user");
  }

  material() {
    this.route.navigateByUrl("/material");
  }

  supplier() {
    this.route.navigateByUrl("/supplier");
  }

  ngOnInit(): void {
  }

}
