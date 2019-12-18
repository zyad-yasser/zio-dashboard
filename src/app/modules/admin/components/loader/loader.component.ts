import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { appLogo, appStringName, fakeLoaderPeriod } from 'src/app/statics/constants';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass'],
  animations: [
    trigger('state', [
      state(
        'visible',
        style({
          opacity: '1'
        })
      ),
      state(
        'hidden',
        style({
          opacity: '0'
        })
      ),
      transition('* => visible', [animate('500ms ease-out')]),
      transition('visible => hidden', [animate('500ms ease-out')])
    ])
  ],
})
export class LoaderComponent implements OnInit {
  public isLoading: Boolean;
  public appLogo = appLogo;
  public appName = appStringName;
  public state = 'visible';

  constructor(private loader: LoaderService) { }

  ngOnInit() {
    this.attachEvents();
    this.fakeLoader();
  }

  private attachEvents(): void {
    this.loader.isLoading.subscribe((res) => {
      this.isLoading = res;
      this.state = this.isLoading
        ? 'visible'
        : 'hidden';
    });
  }

  private fakeLoader(): void {
    this.loader.show();
    setTimeout(
      () => {
        this.state = 'hidden';
      },
      fakeLoaderPeriod
    );
  }

  public animationDone(event) {
    if (event.toState === 'hidden') {
      this.isLoading = false;
    }
  }
}
