import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users/users.service';
import { toastrConfig } from 'src/app/statics/constants';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';

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
    private projectsService: ProjectsService,
    private clientsService: ClientsService,
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

  public deleteClient(): void {
    const clientId = this.data.id;
    this.isSaving = true;
    this.clientsService.delete(clientId).subscribe(
      () => {
        this.dialogRef.close('deleted');
        this.toastrService.success('Client deleted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Problem deleting client', null, toastrConfig);
      },
      () => {
        this.isSaving = false;
      }
    );
  }

  public deleteProject(): void {
    const projectId = this.data.id;
    this.isSaving = true;
    this.projectsService.delete(projectId).subscribe(
      () => {
        this.dialogRef.close('deleted');
        this.toastrService.success('Project deleted successfully', null, toastrConfig);
      },
      () => {
        this.dialogRef.close();
        this.toastrService.error('Problem deleting project', null, toastrConfig);
      },
      () => {
        this.isSaving = false;
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
    } else if (this.data.type === 'deleteClientModal') {
      this.confirmString1 = 'Are you sure want to delete this client ?';
      this.buttonAction = 'Delete';
      this.modalTitle = 'Delete client';
      this.onSubmit = this.deleteClient;
    } else if (this.data.type === 'deleteProjectModal') {
      this.confirmString1 = 'Are you sure want to delete this project ?';
      this.buttonAction = 'Delete';
      this.modalTitle = 'Delete project';
      this.onSubmit = this.deleteProject;
    } else if (this.data.type === 'resetPasswordModal') {
      this.modalTitle = 'MODALS.RESET_PASSWORD';
      this.confirmString1 = 'Are you sure want to reset this users password ?';
      this.buttonAction = 'Reset';
      this.modalTitle = 'Reset password';
      this.onSubmit = this.resetPassword;
    }
  }
}
