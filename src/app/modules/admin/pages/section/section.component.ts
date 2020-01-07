import { Component, OnInit, Type } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ToastrService } from 'ngx-toastr';
import { TypesService } from 'src/app/services/types/types.service';
import { toastrConfig, modalConfig } from 'src/app/statics/constants';
import { Observable } from 'rxjs';
import { MediaChooseComponent } from '../../modals/media-choose/media-choose.component';
import { SectionsService } from 'src/app/services/sections/sections.service';
import { Section } from 'src/app/models/section';
import { sections } from 'src/app/statics/sections';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.sass']
})
export class SectionComponent implements OnInit {
  public section: Section = new Section();
  public currentLocation: string[] = ['Home', 'Sections', ''];
  public pageName = 'Edit section';
  public config = { height: 300 };

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private sectionsService: SectionsService,
    private router: Router,
    private modalService: ModalService,
    private toastrService: ToastrService,
    private typesService: TypesService,
  ) {}

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  public ready(event) {
    setTimeout(
      () => {
        event.editor.document.getBody().setStyle('background-color', '#000');
        event.editor.document.getBody().setStyle('color', '#FFF');
      },
      0
    );
  }

  public singleImage() {
    return {
      _id: '',
      url: this.section.singleImage
    };
  }

  public onSubmit(): void {
    const sectionType = this.section.type;
    this.sectionsService.findCreateOrUpdate(sectionType, this.section)
      .subscribe(
        () => {
          this.toastrService.success(`Section updated successfully`, null, toastrConfig);
        },
        () => {
          this.toastrService.error(`Error Updating section`, null, toastrConfig);
        }
      );
  }

  public initializePageInfo(): void {
    const type = this.route.snapshot.params['type'];
    this.sectionsService.getOneByType(type).subscribe(
      (res) => {
        let data;
        if (!res) {
          const filteredSections = sections.filter(item => item.type === type);
          data = filteredSections[0];
        } else {
          data = res;
        }
        this.section = data;
        this.currentLocation[2] = type;
      }
    );
  }

  public openMediaImagesMultiple() {
    const config = {
      ...modalConfig,
      width: '90%',
      height: '90%',
      id: 'mediaChooseModal',
      data: { type: 'mediaChooseModal', mode: 'multiple' }
    };
    const cb = (res) => {
      if (res) {
        this.section.multipleImages = [...this.section.multipleImages, ...res];
      }
    };
    this.modalService.initMedia(this, MediaChooseComponent, cb, config);
  }

  public openMediaImagesSingle() {
    const config = {
      ...modalConfig,
      width: '90%',
      height: '90%',
      id: 'mediaChooseModal',
      data: { type: 'mediaChooseModal', mode: 'single' }
    };
    const cb = (res) => {
      if (res) {
        this.section.singleImage = res.url;
      }
    };
    this.modalService.initMedia(this, MediaChooseComponent, cb, config);
  }

  public deleteImage(index: number) {
    if (this.section.multipleImages.length > 1) {
      this.section.multipleImages.splice(index, 1);
    }
  }

  public save(): void {
    this.onSubmit();
  }

  public ngOnInit(): void {
    this.initializePageInfo();
  }
}
