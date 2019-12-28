import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Sidenav } from 'src/app/models/sidenav';
import { sidenavItems } from 'src/app/statics/sidenav';
import { Router } from '@angular/router';
import { modalConfig, appLogo, appStringName } from 'src/app/statics/constants';
import { User } from 'src/app/models/user';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavToggleEmitter: EventEmitter<any> = new EventEmitter();
  @Output() sideNavClose: EventEmitter<any> = new EventEmitter();
  public appLogo: string = appLogo;
  public appName: string = appStringName;
  public isExpanded = false;
  public activeTab = 0;
  public sidenavItems: Sidenav[] = sidenavItems;
  public sideMenuCollapseState = false;
  public mode = 'side';

  constructor(
    public helper: HelperService,
    private router: Router,
    private uiService: UiService
  ) {
    this.sidenavItems.some((item, index) => {
      if (item.link === this.helper.sidenav) {
        return this.activeTab = index;
      }
    });
    this.activeTab = this.activeTab === undefined ? 0 : this.activeTab;
  }

  @HostListener('window:resize', ['$event'])
  public getMenuMode(event?): void {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 590) {
      this.mode = 'over';
      return;
    }
    this.mode = 'side';
  }

  public navigator(index) {
    this.activeTab = index;
    const pageName = this.sidenavItems[index].link;
    this.router.navigate([`/admin/${pageName}`]);
  }

  public toggleCollapse(): void {
    this.uiService.sideMenuCollapseState.emit();
  }

  public close(): void {
    this.sideNavClose.emit();
  }

  public attachEvents(): void {
    this.uiService.sideMenuCollapseState
      .subscribe((res: boolean) => {
        this.sideMenuCollapseState = !this.sideMenuCollapseState;
      });
  }

  ngOnInit() {
    this.attachEvents();
    this.getMenuMode();
  }
}
