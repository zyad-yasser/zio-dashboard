import { Component, OnInit, Input } from '@angular/core';
import { MultiStage } from 'src/app/models/multi-stage';

@Component({
  selector: 'app-multi-stage',
  templateUrl: './multi-stage.component.html',
  styleUrls: ['./multi-stage.component.sass']
})
export class MultiStageComponent implements OnInit {
  @Input() public data: MultiStage[];

  constructor() { }

  ngOnInit() {
  }

}
