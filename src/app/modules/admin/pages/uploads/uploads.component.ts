import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.sass']
})
export class UploadsComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Media'];
  public pageName = 'Media';

  constructor() { }

  ngOnInit() {
  }

}
