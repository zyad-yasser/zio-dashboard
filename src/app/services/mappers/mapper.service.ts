import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { tableDateFormat } from 'src/app/statics/constants';
import { sections } from 'src/app/statics/sections';

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

  public agents(data) {
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
        mappedItem['Photo'] = item.image;
        mappedItem['Agent name'] = item.name || '-';
        mappedItem['Email'] = item.email || '-';
        mappedItem['Creation date'] = item.createdAt ? moment(item.createdAt).format(tableDateFormat) : '-';
        mappedItem['Visibility'] = item.visibility ? 'Visible' : 'Not visible';
        mappedItem['Actions'] = 'action:editAgent';
        mappedItem['id'] = item._id;
        mappedItem.defaultData = item;
        return mappedItem;
      });
    }
    return [];
  }

  public partners(data) {
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
        mappedItem['Partner name'] = item.name || '-';
        mappedItem['Creation date'] = item.createdAt ? moment(item.createdAt).format(tableDateFormat) : '-';
        mappedItem['Visibility'] = item.visibility ? 'Visible' : 'Not visible';
        mappedItem['Actions'] = 'action:editPartner';
        mappedItem['id'] = item._id;
        mappedItem.defaultData = item;
        return mappedItem;
      });
    }
    return [];
  }

  public categories(data) {
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
        mappedItem['Category name'] = item.name || '-';
        mappedItem['Creation date'] = item.createdAt ? moment(item.createdAt).format(tableDateFormat) : '-';
        mappedItem['Visibility'] = item.visibility ? 'Visible' : 'Not visible';
        mappedItem['Actions'] = 'action:editCategory';
        mappedItem['id'] = item._id;
        mappedItem.defaultData = item;
        return mappedItem;
      });
    }
    return [];
  }

  public projectTypes(data) {
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
        mappedItem['Type name'] = item.name;
        mappedItem['Creation date'] = item.createdAt ? moment(item.createdAt).format(tableDateFormat) : '-';
        mappedItem['Visibility'] = item.visibility ? 'Visible' : 'Not visible';
        mappedItem['Actions'] = 'action:editType';
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
        mappedItem['Project name'] = item.name || '-';
        mappedItem['Place'] = item.place || '-';
        mappedItem['Design date'] = item.designDate ? moment(item.designDate).format(tableDateFormat) : '-';
        mappedItem['Creation date'] = item.createdAt ? moment(item.createdAt).format(tableDateFormat) : '-';
        mappedItem['Visibility'] = item.visibility ? 'Published' : 'Draft';
        mappedItem['Actions'] = 'action:editProject';
        mappedItem['id'] = item._id;
        mappedItem.defaultData = item;
        return mappedItem;
      });
    }
    return [];
  }

  private sectionFiller(data: any[]): any[] {
    return sections.map((mockSection) => {
      const sectionType = mockSection.type;
      const filteredSections = data.filter(realSection => realSection.type === sectionType);
      return filteredSections.length > 0
        ? filteredSections[0]
        : mockSection;
    });
  }

  public sections(data) {
    return this
      .sectionFiller(data)
      .sort((b, a) => {
        if (a.page.toLowerCase() > b.page.toLowerCase()) return -1;
        if (a.page.toLowerCase() < b.page.toLowerCase()) return 1;
        return 0;
      })
      .map((item, index) => {
        const mappedItem: any = {};
        mappedItem['#'] = index + 1;
        mappedItem['Section type'] = item.type || '-';
        mappedItem['Page'] = item.page || '-';
        mappedItem['Actions'] = 'action:editSection';
        mappedItem['id'] = item._id;
        mappedItem.defaultData = item;
        return mappedItem;
      });
  }
}
