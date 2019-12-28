import { Component, OnInit, Input, HostListener } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class LayoutDashbaordComponent implements OnInit {
  public sideMenuOpenState = true;
  public sideMenuCollapseState = false;
  public mode = 'side';

  constructor(private loaderService: LoaderService, private uiService: UiService) { }

  @HostListener('window:resize', ['$event'])
  public getMenuMode(event?): void {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 590) {
      this.sideMenuOpenState = false;
      this.mode = 'over';
      return;
    }
    this.mode = 'side';
  }

  public attachEvents(): void {
    this.uiService.sideMenuOpenState
      .subscribe((res: boolean) => {
        this.sideMenuOpenState = !this.sideMenuOpenState;
      });
    this.uiService.sideMenuCollapseState
    .subscribe((res: boolean) => {
      this.sideMenuCollapseState = !this.sideMenuCollapseState;
    });
  }

  public close(): void {
    this.sideMenuOpenState = false;
  }

  ngOnInit() {
    this.loaderService.show();
    this.attachEvents();
    this.getMenuMode();
  }
}
