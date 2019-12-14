import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  constructor() {}
  public connection = new BehaviorSubject(true);
  public connect() {
    const online = fromEvent(window, 'online');
    const offline = fromEvent(window, 'offline');
    online.subscribe(() => {
      this.connection.next(true);
    });
    offline.subscribe(() => {
      this.connection.next(false);
    });
  }
}
