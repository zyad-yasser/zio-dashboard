import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { clientsColumns } from 'src/app/statics/tables';
import { MatDialog } from '@angular/material';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { modalConfig, toastrConfig } from 'src/app/statics/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { ToastrService } from 'ngx-toastr';
import { TypesService } from 'src/app/services/types/types.service';
import { Observable } from 'rxjs';
import { MediaChooseComponent } from '../../modals/media-choose/media-choose.component';
import { Type } from 'src/app/models/type';

@Component({
  selector: 'app-project-type',
  templateUrl: './project-type.component.html',
  styleUrls: ['./project-type.component.sass']
})
export class ProjectTypeComponent implements OnInit {
  public type: Type = new Type();
  public currentLocation: string[] = ['Home', 'Project types', ''];
  public projectTypeForm: FormGroup = this.formConstructor();
  public pageName = '';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private router: Router,
    private modalService: ModalService,
    private clientsService: ClientsService,
    private toastrService: ToastrService,
    private typesService: TypesService,
  ) {}

  public onSubmit(): void {
    const typeId = this.type._id;
    const requestType = typeId
      ? 'updat'
      : 'creat';
    this.processType()
      .subscribe(
        () => {
          this.toastrService.success(`Type ${requestType}ed successfully`, null, toastrConfig);
        },
        () => {
          this.toastrService.error(`Error ${requestType}ing type`, null, toastrConfig);
        }
      );
  }

  private processType(): Observable<any> {
    const typeId = this.type._id;
    const typeData = { ...this.type };
    if (typeId) {
      return this.typesService.update(typeData, typeId);
    }
    return this.typesService.create(typeData);
  }

  public formConstructor(): FormGroup {
    const form: any = {
      name: new FormControl(this.type.name, []),
    };
    return new FormGroup(form);
  }

  public initializePageInfo(): void {
    const id = this.route.snapshot.params['id'];
    if (id === 'new') {
      this.pageName = 'Create project type';
      this.currentLocation[2] = 'Create project type';
    } else {
      this.typesService.getOneById(id).subscribe(
        (res) => {
          this.type = res;
          this.pageName = 'Edit project type';
          this.currentLocation[2] = this.type.name;
        },
        (err) => {
          this.router.navigate(['admin/projects']);
        },
        () => {
          this.projectTypeForm = this.formConstructor();
        }
      );
    }
  }

  public openMediaImages() {
    const config = {
      ...modalConfig,
      width: '90%',
      height: '90%',
      id: 'mediaChooseModal',
      data: { type: 'mediaChooseModal', mode: 'multiple' }
    };
    const cb = (res) => {
      if (res) {
        this.type.images = [...this.type.images, ...res];
      }
    };
    this.modalService.initMedia(this, MediaChooseComponent, cb, config);
  }

  public deleteImage(index: number) {
    this.type.images.splice(index, 1);
  }

  public setVisibility(event): void {
    this.type.visibility = event.checked;
  }

  private collectValues(): void {
    this.type.name = this.projectTypeForm.get('name').value;
  }

  public save(): void {
    this.collectValues();
    this.onSubmit();
  }

  public ngOnInit(): void {
    this.initializePageInfo();
  }
}
