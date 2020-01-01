import { Injectable, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { HelperService } from '../helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  constructor(
    private sanitizer: DomSanitizer,
    private helper: HelperService,
  ) {}

  public safePadding(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('padding: 5px !important');
  }

  public pageValidator(page, maxPages): boolean {
    if (typeof page === 'number' && page >= 0 && page <= maxPages && page % 1 === 0) {
      return true;
    }
    return false;
  }

  public alChangeWord(pageSize): void {
    if (pageSize > 5) {
      const matSelect: HTMLElement = document.querySelector('.mat-select');
      const paginatorDropdown = document.querySelector('.mat-select-value-text').children[0];
      paginatorDropdown.innerHTML =
        pageSize === 99999
        ? 'All'
        : String(pageSize);
      matSelect.style.width =
        pageSize === 100
        ? `${95}px`
        : `${92}px`;
    }
  }

  public getSortedPaginatedData(dataSource, paginator): MatTableDataSource<any> {
    let sortedDataSource: any[] = dataSource.sortData(dataSource.filteredData, dataSource.sort);
    const incomingPageIndex = paginator.pageIndex;
    const startIndex = incomingPageIndex * paginator.pageSize;
    const endIndex = (incomingPageIndex + 1) * paginator.pageSize;
    sortedDataSource = sortedDataSource.slice(startIndex, endIndex);
    const outputDataSource = new MatTableDataSource(sortedDataSource);
    return outputDataSource;
  }

  public sortOverride(item, property): any {
    switch (property) {
      case 'Creation date': {
        const date = new Date(this.helper.momentToRealDate(item['Creation date']).getTime());
        return item['Creation date'] === '-' ? 0 : date;
      }
      default: return typeof item[property] === 'string' ? item[property].toLocaleLowerCase() : item[property];
    }
  }
}
