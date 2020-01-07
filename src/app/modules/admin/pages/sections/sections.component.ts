import { Component, OnInit } from '@angular/core';
import { sectionsColumns } from 'src/app/statics/tables';
import { MatDialog } from '@angular/material';
import { MapperService } from 'src/app/services/mappers/mapper.service';
import { SectionsService } from 'src/app/services/sections/sections.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.sass']
})
export class SectionsComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Sections'];
  public pageName = 'Sections';
  public displayedColumns = sectionsColumns;
  public pageSizeOptions = [25, 100, 250];
  public tableType = 'sections';
  public maxPageSize = 25;
  public activeSortColumn = 'Page';
  public sortDirection = 'asc';
  public sections: any[] = [];

  constructor(
    public dialog: MatDialog,
    private sectionsService: SectionsService,
    private mapperService: MapperService
  ) {}

  public listSections(): void {
    this.sectionsService.list()
      .subscribe((res) => {
        const data = res && res.length
          ? res
          : [];
        this.sections = this.mapperService.sections(data);
      });
  }

  ngOnInit() {
    this.listSections();
  }
}
