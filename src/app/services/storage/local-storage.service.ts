import { Injectable } from '@angular/core';
import { appName } from 'src/app/statics/constants';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getData(key: string) {
    return JSON.parse(localStorage.getItem(appName + key));
  }
  setData(key: string, data: any) {
    localStorage.setItem(appName + key, JSON.stringify(data));
  }
  removeData(key: string) {
    localStorage.removeItem(appName + key);
  }
  clearAll() {
    localStorage.clear();
  }
}
