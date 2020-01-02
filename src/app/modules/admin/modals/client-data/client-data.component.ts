import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material';
import {
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { toastrConfig, modalConfig, baseUrl } from 'src/app/statics/constants';
import { emailPattern } from 'src/app/statics/patterns';
import { Observable } from 'rxjs';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal/modal.service';
import { MediaChooseComponent } from '../media-choose/media-choose.component';
import { urls } from 'src/app/statics/urls';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.sass'],
})
export class ClientsDataComponent implements OnInit {
  public client: any = {};
  public clientForm: FormGroup = this.formConstructor();
  public emailPattern = emailPattern;
  public isSaving: boolean;
  public emailExistError = false;
  public modalTitle = '';
  public modalAction = '';
  public observable: Observable<any>;
  public clientId: string;
  public logo = null;

  constructor(
    public dialogRef: MatDialogRef<ClientsDataComponent>,
    public dialogRefMedia: MatDialogRef<MediaChooseComponent>,
    private toastrService: ToastrService,
    private clientsService: ClientsService,
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
      name: new FormControl(this.client.name, [Validators.required])
    };
    this.logo = this.getLogoUrl(this.client.image);
    return new FormGroup(form);
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
    this.client.name = this.clientForm.get('name').value;
    this.observable = this.data.type === 'createClientModal'
      ? this.clientsService.create(this.client)
      : this.clientsService.update(this.client, this.clientId);
    this.observable
      .subscribe(
        (res) => {
          this.dialogRef.close(this.client);
          this.toastrService.success('Operation done successfully', null, toastrConfig);
        },
        (err) => {
          this.toastrService.success('Error in the operation', null, toastrConfig);
        }
      );
  }

  public openMedia(): void {
    const config = { ...modalConfig, width: '90%', height: '90%', id: 'mediaChooseModal', data: { type: 'mediaChooseModal' } };
    const cb = (res) => {
      if (res) {
        const url = res.url;
        this.logo = url;
        this.client.image = url;
      }
    };
    this.modalService.initMedia(this, MediaChooseComponent, cb, config);
  }

  private modalInit(): void {
    if (this.data.type === 'createClientModal') {
      this.modalAction = 'Create';
      this.modalTitle = 'Create client';
    } else if (this.data.type === 'editClientModal') {
      this.modalAction = 'Update';
      this.modalTitle = 'Update client';
      this.clientId = this.data.id;
      this.client = this.data.client;
      this.clientForm = this.formConstructor();
      this.logo = this.data.client.image;
    }
  }

  public ngOnInit(): void {
    this.modalInit();
  }
}
