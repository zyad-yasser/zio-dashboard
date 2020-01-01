import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    this.changes.next();
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    const editedLength = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < editedLength
        ? Math.min(startIndex + pageSize, editedLength)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} of ${editedLength} items`;
  }
}
