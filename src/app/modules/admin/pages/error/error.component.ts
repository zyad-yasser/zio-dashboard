import { Component, OnInit } from '@angular/core';
import { appLogo } from 'src/app/statics/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {
  public appLogo: string = appLogo;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public back(): void {
    this.router.navigate(['admin/dashboard']);
  }

}
