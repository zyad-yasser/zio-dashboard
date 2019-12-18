import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class LayoutDashbaordComponent implements OnInit {
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.show();
  }
}
