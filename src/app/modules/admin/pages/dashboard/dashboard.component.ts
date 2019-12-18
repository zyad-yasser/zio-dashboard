import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Dashboard'];
  public pageName = 'Dashboard';

  constructor() { }

  ngOnInit() {
  }

}
