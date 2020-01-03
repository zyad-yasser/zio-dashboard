import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  public currentLocation: string[] = ['Home', 'Projects', ''];
  public pageName = '';
  public project: any = {};
  public config = { height: 500 };

  constructor(private route: ActivatedRoute, private projectService: ProjectsService, private router: Router) { }

  public initializePageInfo(): void {
    const slug = this.route.snapshot.params['slug'];
    if (slug === 'new') {
      this.pageName = 'Create project';
      this.currentLocation[2] = 'Create project';
    } else {
      this.projectService.getOneBySlug(slug)
        .subscribe(
          (res) => {
            this.project = res;
            this.pageName = 'Edit project';
            this.currentLocation[2] = this.project.name;
          },
          (err) => {
            this.router.navigate(['admin/projects']);
          }
        );
    }
  }

  public ready(event) {
    event.editor.document.getBody().setStyle('background-color', '#000');
    event.editor.document.getBody().setStyle('color', '#FFF');
  }

  public publish(): void {

  }

  public saveDraft(): void {

  }

  public ngOnInit(): void {
    this.initializePageInfo();
  }

}
