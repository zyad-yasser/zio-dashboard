import { Component, OnInit } from '@angular/core';
import { projectsColumns } from 'src/app/statics/tables';
import { MatDialog } from '@angular/material';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { MapperService } from 'src/app/services/mappers/mapper.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { modalConfig } from 'src/app/statics/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Projects'];
  public pageName = 'Projects';
  public displayedColumns = projectsColumns;
  public pageSizeOptions = [25, 100, 250];
  public tableType = 'projects';
  public maxPageSize = 25;
  public activeSortColumn = 'Project name';
  public sortDirection = 'asc';
  public projects: any[] = [];

  constructor(
    public dialog: MatDialog,
    private projectsService: ProjectsService,
    private mapperService: MapperService,
    private modalService: ModalService,
    private router: Router
  ) {}

  public listProjects(): void {
    this.projectsService.list()
      .subscribe((res) => {
        this.projects = this.mapperService.projects(res);
      });
  }

  public createProject(): void {
    this.router.navigate(['admin/project/new']);
  }

  ngOnInit() {
    this.listProjects();
  }
}
