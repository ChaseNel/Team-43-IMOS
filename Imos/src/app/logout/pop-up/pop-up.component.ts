import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(private router: Router) { }

  Logout(){
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
  }

}
