import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ConnectionService } from 'src/app/services/connection/connection.service';
import { appStringName } from 'src/app/statics/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {
  public isLoggedin;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private helper: HelperService,
    public titleService: Title,
    private connection: ConnectionService,
    private translate: TranslateService,
  ) {
    this.translate.use('en');
  }

  private titleSetter(event): void {
    const title = `${appStringName} - ${event.title}`;
    this.titleService.setTitle(title);
  }

  public manageRoutes(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            // tslint:disable-next-line: no-parameter-reassignment
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe((event) => {
        this.isLoggedin = this.helper.isLoggedin();
        this.helper.routePath = this.router.url;
        this.helper.sidenav = event['sidenav'];
        this.helper.langDetect();
        this.titleSetter(event);
      });
  }

  ngOnInit() {
    this.manageRoutes();
  }

  ngAfterViewInit(): void {
    this.connection.connect();
  }
}
