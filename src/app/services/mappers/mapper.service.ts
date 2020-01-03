import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { tableDateFormat } from 'src/app/statics/constants';

@Injectable({
  providedIn: 'root'
})

export class MapperService {

  constructor() { }

  public users(data) {
    if (data && data.length) {
      return data
      .sort((b, a) => {
        if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return -1;
        if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return 1;
        return 0;
      })
      .filter(item => !item.isSuperAdmin)
      .map((item, index) => {
        const mappedItem: any = {};
        mappedItem['#'] = index + 1;
        mappedItem['First name'] = item.firstName || '-';
        mappedItem['Last name'] = item.lastName || '-';
        mappedItem['Email'] = item.email || '-';
        mappedItem['Creation date'] = item.createdAt ? moment(item.createdAt).format(tableDateFormat) : '-';
        mappedItem['Status'] = item.active ? 'Active' : 'Inactive';
        mappedItem['Actions'] = 'action:editUser';
        mappedItem['id'] = item._id;
        mappedItem.defaultData = item;
        return mappedItem;
      });
    }
    return [];
  }

  public clients(data) {
    if (data && data.length) {
      return data
      .sort((b, a) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        return 0;
      })
      .map((item, index) => {
        const mappedItem: any = {};
        mappedItem['#'] = index + 1;
        mappedItem['Logo'] = item.image;
        mappedItem['Client name'] = item.name || '-';
        mappedItem['Last name'] = item.lastName || '-';
        mappedItem['Creation date'] = item.createdAt ? moment(item.createdAt).format(tableDateFormat) : '-';
        mappedItem['Visibility'] = item.visible ? 'Visible' : 'Not visible';
        mappedItem['Actions'] = 'action:editClient';
        mappedItem['id'] = item._id;
        mappedItem.defaultData = item;
        return mappedItem;
      });
    }
    return [];
  }

  public projects(data) {
    if (data && data.length) {
      return data
      .sort((b, a) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        return 0;
      })
      .map((item, index) => {
        const mappedItem: any = {};
        mappedItem['#'] = index + 1;
        mappedItem['Logo'] = item.image;
        mappedItem['Client name'] = item.name || '-';
        mappedItem['Last name'] = item.lastName || '-';
        mappedItem['Creation date'] = item.createdAt ? moment(item.createdAt).format(tableDateFormat) : '-';
        mappedItem['Visibility'] = item.visible ? 'Visible' : 'Not visible';
        mappedItem['Actions'] = 'action:editClient';
        mappedItem['id'] = item._id;
        mappedItem.defaultData = item;
        return mappedItem;
      });
    }
    return [];
  }
}
