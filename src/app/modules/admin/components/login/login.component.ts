import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginData } from 'src/app/models/login';
import { emailPattern } from 'src/app/statics/patterns';
import { AuthService } from 'src/app/modules/core/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginFormComponent implements OnInit {
  public loginData: LoginData = new LoginData();
  public rememberMe = false;
  public emailPattern = emailPattern;
  public loginError = false;
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
    private router: Router,
  ) {}

  public ngOnInit(): void {}

  public login(): void {
    this.loginError = false;
    this.loginData.email = this.emailFormControl.value;
    this.loginData.password = this.passwordFormControl.value;
    this.isLoggingIn = true;
    this.authService.login(this.loginData)
      .subscribe(
        (res) => {
          this.authService.setTokens(res, this.rememberMe);
          this.authService.setUserData(res, this.rememberMe);
          this.router.navigate([`dashboard`]);
        },
        () => {
          this.loginError = true;
        },
        () => {
          this.isLoggingIn = false;
        }
      );
  }
}
