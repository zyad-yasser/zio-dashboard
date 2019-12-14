import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users/users.service';
import { toastrConfig } from 'src/app/statics/constants';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass']
})
export class ConfirmationComponent implements OnInit {
  public confirmString1 = '';
  public modalTitle = '';
  isSaving: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    private translate: TranslateService,
    private toastr: ToastrService,
    private users: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  public deleteUser(): void {
    const userId = this.data.userId;
    this.isSaving = true;
    this.users.delete(userId).subscribe(
      (response) => {
        const message = this.translate.instant('TOASTR.SUCCESS_DELETING_USER');
        this.dialogRef.close('deleted');
        this.toastr.success(message, null, toastrConfig);
      },
      (error: any) => {
        const message = this.translate.instant('TOASTR.ERROR_DELETING_USER');
        this.dialogRef.close();
        this.toastr.error(message, null, toastrConfig);
      }
    );
  }

  public resetPassword(): void {
    const userId = this.data.userId;
    this.isSaving = true;
    this.users.resetPassword(userId).subscribe(
      (response) => {
        const message = this.translate.instant('TOASTR.SUCCESS_RESET_PASSWORD');
        this.dialogRef.close();
        this.toastr.success(message, null, toastrConfig);
      },
      (error: any) => {
        const message = this.translate.instant('TOASTR.ERROR_RESET_PASSWORD');
        this.dialogRef.close();
        this.toastr.error(message, null, toastrConfig);
      }
    );
  }

  ngOnInit(): void {
    if (this.dialogRef.id === 'deleteUserModal') {
      this.confirmString1 = 'MODALS.DELETE_USER_STRING1';
      this.modalTitle = 'MODALS.DELETE_USER';
    } else if (this.dialogRef.id === 'resetPasswordModal') {
      this.modalTitle = 'MODALS.RESET_PASSWORD';
      this.confirmString1 = 'MODALS.RESET_PASSWORD_STRING1';
    }
  }
}
