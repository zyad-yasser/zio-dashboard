import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bread-crump',
  templateUrl: './bread-crump.component.html',
  styleUrls: ['./bread-crump.component.sass']
})
export class BreadCrumpComponent implements OnInit {
  @Input() public data: string[];

  constructor() { }

  ngOnInit() {
  }
}
