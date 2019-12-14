import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/models/login';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/core/auth/auth.service';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { emailPattern } from 'src/app/statics/patterns';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection/connection.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && ((control.dirty && control.touched) || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  animations: [
    trigger('errShowHide', [
      state('show', style({
        display: 'flex',
        marginTop: '14px',
      })),
      state('hide', style({
        marginTop: '0px',
        display: 'none',
      })),
      transition('hide => show', [
        animate('0.1s')
      ]),
    ]),
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  public loginData: LoginData = new LoginData();
  public emailBlurred = true;
  public passwordBlurred = true;
  public rememberMe = false;
  public emailPattern = emailPattern;
  public matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  public errors: any[] = [];
  public online = false;

  public emailFormControl = new FormControl(this.loginData.email, [
    Validators.required,
    Validators.email,
  ]);

  public passwordFormControl = new FormControl(this.loginData.password, [
    Validators.required,
  ]);

  isLoggingIn: boolean;

  constructor(
    private authService: AuthService,
    private helper: HelperService,
    private usersService: UsersService,
    private router: Router,
    private connection: ConnectionService
  ) { }

  ngOnInit() {
    this.connection.connection
      .subscribe(
        (result: boolean) => {
          this.online = result;
        },
        (err) => {
          // Handle errors here
        }
      );
  }

  public onFocus(type) {
    if (type === 'email') {
      this.emailBlurred = false;
    } else {
      this.passwordBlurred = false;
    }
  }

  public onBlur(type) {
    if (type === 'email') {
      this.emailBlurred = true;
    } else {
      this.passwordBlurred = true;
    }
  }

  public login() {
    this.errors = [];
    this.loginData.email = this.emailFormControl.value;
    this.loginData.password = this.passwordFormControl.value;
    this.isLoggingIn = true;
    this.authService.login(this.loginData).subscribe(
      (response) => {
        this.authService.setToken(response, this.rememberMe);
        this.getRoles(response);
      },
      (error: any) => {
        this.isLoggingIn = false;
        this.errors = this.helper.handleError(error.error);
      });
  }

  setCredentials(user, roles) {
    const lang = this.helper.lang;
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    this.authService.setCredentials(user, this.rememberMe, roles);
    this.router.navigate([`/${lang}/uploads`]);
  }

  getRoles(user) {
    this.usersService.getRoles().subscribe(
      (response) => {
        const roles = response;
        this.setCredentials(user, roles);
      },
      (error: any) => {});
  }
}
