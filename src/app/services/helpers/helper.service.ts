import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../storage/local-storage.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { tableDateFormat } from 'src/app/statics/constants';
import { AuthService } from 'src/app/modules/core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})

export class HelperService {
  public lang = 'en';
  public routePath: string;
  public sidenav: any;

  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private storage: LocalStorageService
    ) {}

  isSuperAdmin(): boolean {
    return this.auth.isSuperAdmin();
  }

  getLoggedin(): User {
    return this.auth.getLoggedin();
  }

  isLoggedin(): boolean {
    return this.auth.isLoggedin();
  }

  public langDetect() {
    this.lang = this.storage.getData('lang') || 'en';
    this.translate.use(this.lang);
  }

  public setLang(lang) {
    this.storage.setData('lang', lang);
    this.langDetect();
  }

  handleError(error): any[] {
    if (error && error.message) {
      return error.message;
    }
    if (Array.isArray(error) || typeof error !== 'object') {
      return error;
    }
    if (! Array.isArray(error) && typeof error === 'object') {
      const arr = Object.keys(error).map((data) => {
        if (data === 'message') {
          return [error[data]];
        }
      });
      return arr;
    }
  }

  formatDate(date: moment.Moment, format: string) {
    if (date) {
      return date.format(format);
    }
  }

  fromatDateRange(dateRange: any) {
    if (dateRange && dateRange.from && dateRange.to) {
      return {
        from: dateRange.from.format('YYYY-MM-DD'),
        to: dateRange.to.format('YYYY-MM-DD'),
      };
    }
  }

  momentToRealDate(momentDate): Date {
    return moment(momentDate, tableDateFormat).toDate();
  }

}
