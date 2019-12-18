import { Component, OnInit } from '@angular/core';
import { ChangePasswordComponent } from 'src/app/modules/shared/modals/change-password/change-password.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/modules/core/auth/auth.service';
import { modalConfig } from 'src/app/statics/constants';
import { User } from 'src/app/models/user';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { Router } from '@angular/router';
import { defaultUser } from 'src/app/statics/default-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public modalConfig = modalConfig;
  public user: User;
  loggingout: boolean;
  errors: any[];

  constructor(
    private modal: ModalService,
    public dialog: MatDialog,
    private authService: AuthService,
    private helper: HelperService,
    private router: Router
  ) {}

  public changePassword(): void {
    this.modal.init(this, ChangePasswordComponent, 'changePasswordModal');
  }

  ngOnInit() {
    this.user = defaultUser;
  }

  public logout() {
    this.loggingout = true;
    this.authService.logout().subscribe(
      (response) => {
        this.authService.clearCredentials();
        this.router.navigate([`${this.helper.lang}/login`]);
      },
      (error: any) => {
        this.loggingout = false;
        this.errors = this.helper.handleError(error.error);
      }
    );
  }
}
