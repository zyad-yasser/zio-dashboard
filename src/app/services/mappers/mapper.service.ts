import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { tableDateFormat } from 'src/app/statics/constants';

@Injectable({
  providedIn: 'root'
})

export class MapperService {

  constructor() { }

  public users(data, roles) {
    if (data && data.length) {
      return data
      .sort((b, a) => {
        if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return -1;
        if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return 1;
        return 0;
      })
      .map((item, index) => {
        const mappedItem = {};
        mappedItem['#'] = index + 1;
        mappedItem['First name'] = item.firstName || '-';
        mappedItem['Last name'] = item.lastName || '-';
        mappedItem['Email'] = item.email || '-';
        mappedItem['Creation date'] = item.createdAt ? moment(item.createdAt).format(tableDateFormat) : '-';
        mappedItem['Status'] = item.isActive ? 'Active' : 'Inactive';
        mappedItem['Role'] = roles.filter(role => item.typeId === role.id)[0].type || '-';
        mappedItem['Action'] = 'action:editUser';
        mappedItem['id'] = item.id;
        return mappedItem;
      });
    }
    return [];
  }

  public uploads(data, type) {
    if (data && data.length) {
      return data
      .sort((b, a) => {
        return a.time.getTime() > b.time.getTime()
          ? -1
          : a.time.getTime() < b.time.getTime()
          ? 1
          : 0;
      })
      .map((item, index) => {
        const mappedItem = {};
        mappedItem['Board name'] = item.boardName || '-';
        mappedItem['Location'] = item.location || '-';
        mappedItem['Department'] = item.department || '-';
        mappedItem['FTP Path'] = item.ftpPath || '-';
        mappedItem['Time (UTC)'] = `${moment(item.time).format('YYYY-MM-DD')} at ${moment(item.time).format('hh:mm:ss')}` || '-';
        if (type === 'all') {
          mappedItem['Imported by'] = item.importedBy || '-';
          mappedItem['Stat'] = item.status || null;
          mappedItem['#'] = index + 1;
        } else if (type === 'unsolved') {
          mappedItem['Action'] = 'action:solve';
          mappedItem['Delete'] = 'action:delete';
        }
        return mappedItem;
      });
    }
    return [];
  }
}
