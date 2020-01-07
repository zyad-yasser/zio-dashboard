import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { toastrConfig, modalConfig, baseUrl } from 'src/app/statics/constants';
import { emailPattern } from 'src/app/statics/patterns';
import { Observable } from 'rxjs';
import { AgentsService } from 'src/app/services/agents/agents.service';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal/modal.service';
import { MediaChooseComponent } from '../media-choose/media-choose.component';
import { urls } from 'src/app/statics/urls';
import { CitiesService } from 'src/app/services/cities/cities.service';

@Component({
  selector: 'app-agent-data',
  templateUrl: './agent-data.component.html',
  styleUrls: ['./agent-data.component.sass']
})
export class AgentDataComponent implements OnInit {
  public agent: any = {};
  public agentForm: FormGroup = this.formConstructor();
  public emailPattern = emailPattern;
  public isSaving: boolean;
  public emailExistError = false;
  public modalTitle = '';
  public modalAction = '';
  public observable: Observable<any>;
  public agentId: string;
  public logo = null;
  public citySearchCtrl = new FormControl();
  public filteredCities: any[] = [];
  public cities: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AgentDataComponent>,
    public dialogRefMedia: MatDialogRef<MediaChooseComponent>,
    private toastrService: ToastrService,
    private agentsService: AgentsService,
    private citiesService: CitiesService,
    private sanitizer: DomSanitizer,
    private modalService: ModalService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  public formConstructor(): FormGroup {
    const form: any = {
      name: new FormControl(this.agent.name, [Validators.required])
    };
    this.logo = this.getLogoUrl(this.agent.image);
    return new FormGroup(form);
  }

  public filterCities(event?): void {
    if (!event) {
      this.filteredCities = [...this.cities];
      return;
    }
    const value = event.target.value.toLowerCase();
    if (value !== '') {
      this.filteredCities = [...this.cities]
        .map((item) => {
          item.compareName = item.name.toLowerCase();
          return item;
        })
        .filter(item => item.compareName.includes(value));
    } else {
      this.filteredCities = [...this.cities];
    }
  }

  public parseLogo(): SafeStyle {
    const style = this.logo
      ? `background-image: url(${this.getLogoUrl(this.logo)})`
      : `background-image: none`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  private getLogoUrl(url: string): string {
    const fullUrl = baseUrl + urls.media.oneUrl;
    return fullUrl + url;
  }

  public onSubmit() {
    this.agent.name = this.agentForm.get('name').value;
    this.observable =
      this.data.type === 'createAgentModal'
        ? this.agentsService.create(this.agent)
        : this.agentsService.update(this.agent, this.agentId);
    this.observable.subscribe(
      (res) => {
        this.dialogRef.close(this.agent);
        this.toastrService.success(
          'Operation done successfully',
          null,
          toastrConfig
        );
      },
      (err) => {
        this.toastrService.success(
          'Error in the operation',
          null,
          toastrConfig
        );
      }
    );
  }

  public openMedia(): void {
    const config = {
      ...modalConfig,
      width: '90%',
      height: '90%',
      id: 'mediaChooseModal',
      data: { type: 'mediaChooseModal', mode: 'single' }
    };
    const cb = (res) => {
      if (res) {
        const url = res.url;
        this.logo = url;
        this.agent.image = url;
      }
    };
    this.modalService.initMedia(this, MediaChooseComponent, cb, config);
  }

  private modalInit(): void {
    if (this.data.type === 'createAgentModal') {
      this.modalAction = 'Create';
      this.modalTitle = 'Create agent';
    } else if (this.data.type === 'editAgentModal') {
      this.modalAction = 'Update';
      this.modalTitle = 'Update agent';
      this.agentId = this.data.id;
      this.agent = this.data.agent;
      this.agentForm = this.formConstructor();
      this.logo = this.data.agent.image;
    }
  }

  private getCities(): void {
    this.citiesService.list()
      .subscribe(
        (res) => {
          this.cities = res;
          this.filteredCities = [...this.cities];
        }
      );
  }

  public ngOnInit(): void {
    this.modalInit();
    this.getCities();
  }
}
