import { Component, OnInit } from '@angular/core';
import { version } from 'src/app/statics/constants';

@Component({
  selector: 'app-version',
  template: `<div class="version">{{ version }}</div>`
})
export class VersionComponent implements OnInit {
  public version: string = version;
  constructor() { }

  ngOnInit() {
  }
}
