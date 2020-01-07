import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { toastrConfig, modalConfig, baseUrl } from 'src/app/statics/constants';
import { emailPattern } from 'src/app/statics/patterns';
import { Observable } from 'rxjs';
import { PartnersService } from 'src/app/services/partners/partners.service';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal/modal.service';
import { MediaChooseComponent } from '../media-choose/media-choose.component';
import { urls } from 'src/app/statics/urls';

@Component({
  selector: 'app-partner-data',
  templateUrl: './partner-data.component.html',
  styleUrls: ['./partner-data.component.sass']
})
export class PartnerDataComponent implements OnInit {
  public partner: any = {};
  public partnerForm: FormGroup = this.formConstructor();
  public emailPattern = emailPattern;
  public isSaving: boolean;
  public emailExistError = false;
  public modalTitle = '';
  public modalAction = '';
  public observable: Observable<any>;
  public partnerId: string;
  public logo = null;

  constructor(
    public dialogRef: MatDialogRef<PartnerDataComponent>,
    public dialogRefMedia: MatDialogRef<MediaChooseComponent>,
    private toastrService: ToastrService,
    private partnersService: PartnersService,
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
      name: new FormControl(this.partner.name, [Validators.required])
    };
    this.logo = this.getLogoUrl(this.partner.image);
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
    this.partner.name = this.partnerForm.get('name').value;
    this.observable =
      this.data.type === 'createPartnerModal'
        ? this.partnersService.create(this.partner)
        : this.partnersService.update(this.partner, this.partnerId);
    this.observable.subscribe(
      (res) => {
        this.dialogRef.close(this.partner);
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
        this.partner.image = url;
      }
    };
    this.modalService.initMedia(this, MediaChooseComponent, cb, config);
  }

  private modalInit(): void {
    if (this.data.type === 'createPartnerModal') {
      this.modalAction = 'Create';
      this.modalTitle = 'Create partner';
    } else if (this.data.type === 'editPartnerModal') {
      this.modalAction = 'Update';
      this.modalTitle = 'Update partner';
      this.partnerId = this.data.id;
      this.partner = this.data.partner;
      this.partnerForm = this.formConstructor();
      this.logo = this.data.partner.image;
    }
  }

  public ngOnInit(): void {
    this.modalInit();
  }
}
