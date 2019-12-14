import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sidenav } from 'src/app/models/sidenav';
import { sidenavItems } from 'src/app/statics/sidenav';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/modules/shared/modals/change-password/change-password.component';
import { modalConfig } from 'src/app/statics/constants';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/modules/core/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { HelperService } from 'src/app/services/helpers/helper.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavToggleEmitter: EventEmitter<any> = new EventEmitter();
  public isExpanded = false;
  public activeTab = 0;
  public sidenavItems: Sidenav[] = sidenavItems;
  public modalConfig = modalConfig;
  public user: User;
  loggingout: boolean;
  errors: any[];

  constructor(
    public helper: HelperService,
    private router: Router,
    private modal: ModalService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {
    this.sidenavItems.some((item, index) => {
      if (item.link === this.helper.sidenav) {
        return this.activeTab = index;
      }
    });
    this.activeTab = this.activeTab === undefined ? 0 : this.activeTab;
  }

  public navigator(index) {
    const lang = this.helper.lang;
    this.activeTab = index;
    this.router.navigate([`/${lang}/${this.sidenavItems[index].link}`]);
  }

  public changePassword(): void {
    this.modal.init(this, ChangePasswordComponent, 'changePasswordModal');
  }

  ngOnInit() {
    this.user = this.helper.getLoggedin();
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
