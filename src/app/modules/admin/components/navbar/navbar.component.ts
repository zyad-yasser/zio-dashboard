import { Component, OnInit, HostListener } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/modules/core/auth/auth.service';
import { modalConfig } from 'src/app/statics/constants';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui/ui.service';
import { ChangePasswordComponent } from '../../modals/change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public modalConfig = modalConfig;
  public user: User;
  public time = new Date();
  public loggingout: boolean;
  public navCollapsedMenu = false;

  constructor(
    private modal: ModalService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private uiService: UiService,
  ) {}

  @HostListener('window:resize', ['$event'])
  public getMenuMode(event?): void {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1050) {
      this.navCollapsedMenu = false;
    }
  }


  public changePassword(): void {
    const config = {
      ...modalConfig,
      id: 'changePasswordModal'
    };
    this.modal.init(this, ChangePasswordComponent, null, config);
  }

  private getUserData(): void {
    this.user = this.authService.getLoggedin();
  }

  private setTime(): void {
    setInterval(
      () => {
        this.time = new Date();
      },
      1000
    );
  }

  public ngOnInit(): void {
    this.getUserData();
    this.setTime();
  }

  public toggleSideMenu(): void {
    this.uiService.sideMenuOpenState.emit();
  }

  public toggleNavCollapsedMenu(): void {
    this.navCollapsedMenu = !this.navCollapsedMenu;
  }

  public logout() {
    this.loggingout = true;
    this.authService.logout().subscribe(
      () => {
        this.authService.clearCredentials();
        this.router.navigate([`admin/login`]);
      },
      () => {
        this.loggingout = false;
      }
    );
  }
}
