import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MapperService } from 'src/app/services/mappers/mapper.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Router } from '@angular/router';
import { projectTypesColumns } from 'src/app/statics/tables';
import { TypesService } from 'src/app/services/types/types.service';

@Component({
  selector: 'app-project-types',
  templateUrl: './project-types.component.html',
  styleUrls: ['./project-types.component.sass']
})
export class ProjectTypesComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Project types'];
  public pageName = 'Project types';
  public displayedColumns = projectTypesColumns;
  public pageSizeOptions = [25, 100, 250];
  public tableType = 'projectTypes';
  public maxPageSize = 25;
  public activeSortColumn = 'Type name';
  public sortDirection = 'asc';
  public projectTypes: any[] = [];

  constructor(
    public dialog: MatDialog,
    private typesService: TypesService,
    private mapperService: MapperService,
    private modalService: ModalService,
    private router: Router,
  ) {}

  public listProjectTypes(): void {
    this.typesService.list()
      .subscribe((res) => {
        this.projectTypes = this.mapperService.projectTypes(res);
      });
  }

  public createProjectType(): void {
    this.router.navigate(['admin/project-type/new']);
  }

  ngOnInit() {
    this.listProjectTypes();
  }
}
