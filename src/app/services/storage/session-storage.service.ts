import { Injectable } from '@angular/core';
import { appName } from 'src/app/statics/constants';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  getData(key: string) {
    return JSON.parse(sessionStorage.getItem(appName + key));
  }
  setData(key: string, data: any) {
    sessionStorage.setItem(appName + key, JSON.stringify(data));
  }
  removeData(key: string) {
    sessionStorage.removeItem(appName + key);
  }
  clearAll() {
    sessionStorage.clear();
  }
}
