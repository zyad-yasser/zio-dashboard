import { Component, OnInit, Input } from '@angular/core';
import { Stack } from 'src/app/models/stack';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.sass']
})
export class StackComponent implements OnInit {
  @Input() data: Stack[];

  constructor() { }

  ngOnInit() {
  }

}
