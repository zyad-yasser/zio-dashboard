import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  public sideMenuOpenState: EventEmitter<boolean> = new EventEmitter();
  public sideMenuCollapseState: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
}
