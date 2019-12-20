import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
  @HostBinding('class.collapsed') public collapsed = false;
  @Input() withTitle: boolean;
  @Input() withButtons: boolean;
  @Input() title: string;

  constructor() { }

  public minimize(): void {
    this.collapsed = !this.collapsed;
  }

  public close(): void {
  }

  ngOnInit() {
  }

}
