import { Component, OnInit, Input } from '@angular/core';
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
  constructor(private loaderService: LoaderService, private uiService: UiService) { }

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

  ngOnInit() {
    this.loaderService.show();
    this.attachEvents();
  }
}
