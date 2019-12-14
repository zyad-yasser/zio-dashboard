import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-head',
  templateUrl: './page-head.component.html',
  styleUrls: ['./page-head.component.sass']
})
export class PageHeadComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
