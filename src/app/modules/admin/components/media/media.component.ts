import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.sass']
})
export class MediaComponent implements OnInit {
  @Input() public area: string;

  constructor() { }

  ngOnInit() {
  }

}
