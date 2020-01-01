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
  public buttonAction = '';
  isSaving: boolean;

  constructor(
    private toastrService: ToastrService,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  public onSubmit() {}

  public deleteUser(): void {
    const userId = this.data.id;
    this.isSaving = true;
    this.usersService.delete(userId).subscribe(
      () => {
        this.dialogRef.close('deleted');
        this.toastrService.success('User deleted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Problem deleting user', null, toastrConfig);
      }
    );
  }

  public resetPassword(): void {
    const userId = this.data.id;
    this.isSaving = true;
    this.usersService.resetPassword(userId).subscribe(
      () => {
        this.dialogRef.close('toggled');
        this.toastrService.success('User password reseted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Error resetting user password', null, toastrConfig);
      }
    );
  }

  ngOnInit(): void {
    if (this.data.type === 'deleteUserModal') {
      this.confirmString1 = 'Are you sure want to delete this user ?';
      this.buttonAction = 'Delete';
      this.modalTitle = 'Delete user';
      this.onSubmit = this.deleteUser;
    } else if (this.data.type === 'resetPasswordModal') {
      this.modalTitle = 'MODALS.RESET_PASSWORD';
      this.confirmString1 = 'Are you sure want to reset this users password ?';
      this.buttonAction = 'Reset';
      this.modalTitle = 'Reset password';
      this.onSubmit = this.resetPassword;
    }
  }
}
