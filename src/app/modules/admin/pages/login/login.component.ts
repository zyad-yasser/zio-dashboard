import { Component, OnInit } from '@angular/core';
import { appLogo } from 'src/app/statics/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  public appLogo = appLogo;

  constructor() {}

  public ngOnInit(): void {
  }
}
