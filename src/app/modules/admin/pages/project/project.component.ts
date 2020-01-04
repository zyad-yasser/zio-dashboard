import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { FormGroup, FormControl } from '@angular/forms';
import { modalConfig, toastrConfig } from 'src/app/statics/constants';
import { MediaChooseComponent } from '../../modals/media-choose/media-choose.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import { MatDialog, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Project } from 'src/app/models/project';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { Client } from 'src/app/models/client';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  @ViewChild('tagsInput', { static: false }) tagsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  public currentLocation: string[] = ['Home', 'Projects', ''];
  public pageName = '';
  public project: Project = new Project();
  public clients: Client[] = [];
  public filteredClients: Client[] = [];
  public config = { height: 300 };
  public slugError = false;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public tagsCtrl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private router: Router,
    private modalService: ModalService,
    private clientsService: ClientsService,
    private toastrService: ToastrService
  ) {}
  public bankFilterCtrl = new FormControl();
  public projectForm: FormGroup = this.formConstructor();

  public onSubmit(): void {
    const projectId = this.project._id;
    const requestType = projectId
      ? 'updat'
      : 'creat';
    this.processProject()
      .subscribe(
        () => {
          this.toastrService.success(`Project ${requestType}ed successfully`, null, toastrConfig);
        },
        () => {
          this.toastrService.error(`Error ${requestType}ing project`, null, toastrConfig);
        }
      );
  }

  private processProject(): Observable<any> {
    const projectId = this.project._id;
    const projectData = { ...this.project };
    projectData.coverImages = projectData.coverImages.map((item: any) => item.url);
    projectData.brandingImages = projectData.brandingImages.map((item: any) => item.url);
    if (projectId) {
      return this.projectService.update(projectData, projectId);
    }
    return this.projectService.create(projectData);
  }

  public addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const readyValue = value.trim();
    if ((value || '').trim()) {
      this.project.tags.push(readyValue);
    }
    if (input) {
      input.value = '';
    }

    this.tagsCtrl.setValue(null);
  }

  public removeTag(tag: any): void {
    const index = this.project.tags.indexOf(tag);

    if (index >= 0) {
      this.project.tags.splice(index, 1);
    }
  }

  public filterClients(event?): void {
    if (!event) {
      this.filteredClients = [...this.clients];
      return;
    }
    const value = event.target.value.toLowerCase();
    if (value !== '') {
      this.filteredClients = [...this.clients]
        .map((item) => {
          item.compareName = item.name.toLowerCase();
          return item;
        })
        .filter(item => item.compareName.includes(value));
    } else {
      this.filteredClients = [...this.clients];
    }
  }

  public formConstructor(): FormGroup {
    const form: any = {
      name: new FormControl(this.project.name, []),
      slug: new FormControl(this.project.slug, []),
      client: new FormControl(this.project.client._id, []),
      description: new FormControl(this.project.description, []),
      designDate: new FormControl(this.project.designDate, []),
      place: new FormControl(this.project.place, []),
      dimensions: new FormControl(this.project.dimensions, [])
    };
    return new FormGroup(form);
  }

  public initializePageInfo(): void {
    const slug = this.route.snapshot.params['slug'];
    if (slug === 'new') {
      this.pageName = 'Create project';
      this.currentLocation[2] = 'Create project';
    } else {
      this.projectService.getOneBySlug(slug).subscribe(
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

  public openMediaCovers() {
    const config = {
      ...modalConfig,
      width: '90%',
      height: '90%',
      id: 'mediaChooseModal',
      data: { type: 'mediaChooseModal', mode: 'multiple' }
    };
    const cb = (res) => {
      if (res) {
        this.project.coverImages = [...this.project.coverImages, ...res];
      }
    };
    this.modalService.initMedia(this, MediaChooseComponent, cb, config);
  }

  public deleteBranding(index: number) {
    this.project.brandingImages.splice(index, 1);
  }

  public deleteCover(index: number) {
    this.project.coverImages.splice(index, 1);
  }

  public slugCheck() {
    this.slugError = undefined;
    const slug = this.projectForm.get('slug').value;
    this.projectService.slugCheck(slug)
      .subscribe(
        (res) => {
          this.slugError = false;
        },
        (err) => {
          this.slugError = true;
        }
      );
  }

  public openMediaBranding() {
    const config = {
      ...modalConfig,
      width: '90%',
      height: '90%',
      id: 'mediaChooseModal',
      data: { type: 'mediaChooseModal', mode: 'multiple' }
    };
    const cb = (res) => {
      if (res) {
        this.project.brandingImages = [...this.project.brandingImages, ...res];
      }
    };
    this.modalService.initMedia(this, MediaChooseComponent, cb, config);
  }

  public ready(event) {
    event.editor.document.getBody().setStyle('background-color', '#000');
    event.editor.document.getBody().setStyle('color', '#FFF');
  }

  public setVisibility(event): void {
    this.project.visibility = event.checked;
  }

  private collectValues(): void {
    this.project.name = this.projectForm.get('name').value;
    this.project.slug = this.projectForm.get('slug').value;
    this.project.client = this.projectForm.get('client').value;
    this.project.description = this.projectForm.get('description').value;
    this.project.designDate = this.projectForm.get('designDate').value;
    this.project.place = this.projectForm.get('place').value;
    this.project.dimensions = this.projectForm.get('dimensions').value;
  }

  public publish(): void {
    this.collectValues();
    this.project.visibility = true;
    this.onSubmit();
  }

  public saveDraft(): void {
    this.collectValues();
    this.project.visibility = false;
    this.onSubmit();
  }

  private getClients(): void {
    this.clientsService.list()
      .subscribe(
        (res) => {
          this.clients = res;
          this.filteredClients = [...this.clients];
        }
      );
  }

  public ngOnInit(): void {
    this.initializePageInfo();
    this.getClients();
  }
}
