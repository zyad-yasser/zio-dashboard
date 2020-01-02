import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImportService } from 'src/app/services/import/import.service';
import { toastrConfig } from 'src/app/statics/constants';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.sass']
})
export class ImportComponent implements OnInit {
  @ViewChild('uploader', { static: false }) uploader: ElementRef;
  public newData: EventEmitter<any> = this.importsService.newData;
  public fileName = 'Select file to upload';
  public readyToUpload: FormData = null;
  public percentDone = 0;
  public importSubscribtion: any;
  public uploading = false;

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private importsService: ImportService,
  ) {}

  public import(): void {
    this.uploading = true;
    this.importSubscribtion = this.importsService.upload(this.readyToUpload)
      .subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.newData.emit(event.body);
          this.toastr.success('Upload completed successfully', null, toastrConfig);
          setTimeout(
            () => {
              this.reset();
            },
            1000
          );
        }
      },
      (error: any) => {
        this.toastr.error('Error uploading files', null, toastrConfig);
        this.percentDone = 0;
        this.uploader.nativeElement.value = '';
        this.uploading = false;
      }
    );
  }

  public async onDrop(event, files?): Promise<any> {
    try {
      const toUploadFile = files
        ? files
        : event.dataTransfer.files;
      if (this.uploading) {
        this.toastr.error('Other uploading process is running, please wait', null, toastrConfig);
        return;
      }
      event.preventDefault();
      await this.formDataConstructor(toUploadFile);
      this.import();
    } catch (err) {
      this.reset();
    }
  }

  public onDragOver(event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  public inputFileHandler(event): void {
    const file = event.target.files;
    this.onDrop(event, file);
  }

  public async formDataConstructor(files: File[]): Promise<any> {
    try {
      await this.importsService.fileCheck(files);
      const fd = new FormData();
      for (let i = 0; i < files.length; i += 1) {
        fd.append('file', files[i]);
      }
      this.readyToUpload = fd;
      return Promise.resolve();
    } catch (err) {
      this.readyToUpload = null;
      this.toastr.error('Error in file size or extension', null, toastrConfig);
      return Promise.reject();
    }
  }

  public browse() {
    if (this.uploading) {
      this.toastr.error('Other uploading process is running, please wait', null, toastrConfig);
      return;
    }
    this.uploader.nativeElement.click();
  }

  public reset() {
    this.percentDone = 0;
    this.readyToUpload = null;
    this.uploader.nativeElement.value = '';
    this.uploading = false;
  }

  public stop() {
    this.importSubscribtion.unsubscribe();
    this.reset();
  }

  public availableTypes() {
    return this.importsService.availabeTypes();
  }

  public ngOnInit() {}
}
