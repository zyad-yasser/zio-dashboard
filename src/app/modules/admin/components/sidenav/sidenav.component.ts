import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sidenav } from 'src/app/models/sidenav';
import { sidenavItems } from 'src/app/statics/sidenav';
import { Router } from '@angular/router';
import { modalConfig, appLogo, appStringName } from 'src/app/statics/constants';
import { User } from 'src/app/models/user';
import { HelperService } from 'src/app/services/helpers/helper.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavToggleEmitter: EventEmitter<any> = new EventEmitter();
  public appLogo: string = appLogo;
  public appName: string = appStringName;
  public isExpanded = false;
  public activeTab = 0;
  public sidenavItems: Sidenav[] = sidenavItems;

  constructor(
    public helper: HelperService,
    private router: Router,
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

  ngOnInit() {
  }
}
