import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent implements OnInit {
  public isLoading: Subject<boolean> = this.loader.isLoading;
  constructor(private loader: LoaderService) { }

  ngOnInit() {
  }

}
