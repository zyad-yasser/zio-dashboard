import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  ErrorStateMatcher,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  NgForm,
  FormControl,
  FormGroupDirective,
  Validators,
  FormGroup
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from 'src/app/models/change-password';
import { toastrConfig } from 'src/app/statics/constants';
import { passwordPattern } from 'src/app/statics/patterns';
import { Validation } from 'src/app/models/validation';
import { passwordValidator } from 'src/app/validators/password-validator';
import { AuthService } from 'src/app/modules/core/auth/auth.service';
import { HelperService } from 'src/app/services/helpers/helper.service';
import confirmPassword from 'src/app/validators/confirm-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent {
  public errors: any[] = [];
  public changePasswordForm: FormGroup = this.formConstructor();
  public passwordPattern = passwordPattern;
  public validation = new Validation();
  public isChangingPassword: boolean;
  public changePasswordError = false;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private helper: HelperService,
    private authService: AuthService,
    private translate: TranslateService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit() {
    this.errors = [];
    this.changePassword();
  }

  public formConstructor(): FormGroup {
    const form: any = {
      confirmPassword: new FormControl(null, [Validators.required]),
      currentPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(passwordPattern)
      ])
    };
    return new FormGroup(form, confirmPassword);
  }

  public passwordGetter(): any {
    const currentPasswordField = this.changePasswordForm.get('currentPassword');
    const newPasswordFiled = this.changePasswordForm.get('newPassword');
    const password: ChangePassword = {
      currentPassword: currentPasswordField
        ? currentPasswordField.value
        : null,
      password: newPasswordFiled.value
    };
    return password;
  }

  public changePassword(): void {
    const password: ChangePassword = this.passwordGetter();
    this.isChangingPassword = true;
    this.authService.changePassword(password).subscribe(
      (response) => {
        const message = this.translate.instant('TOASTR.SUCCESS_PASSWORD');
        this.dialogRef.close();
        this.toastr.success(message, null, toastrConfig);
      },
      (error: any) => {
        this.isChangingPassword = false;
        this.errors = this.helper.handleError(error.error);
      }
    );
  }

  public validate(event: any): void {
    this.changePasswordError = false;
    const password = event.target.value;
    this.validation = passwordValidator(password);
  }
}
