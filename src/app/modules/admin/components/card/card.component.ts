import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
  @Input() withTitle: boolean;
  @Input() withButtons: boolean;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
