import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { urls } from 'src/app/statics/urls';
import { uploadFileSize, baseUrl } from 'src/app/statics/constants';
import { fileTypes } from 'src/app/statics/fileTypes';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  constructor(private http: HttpClient) {}

  public newData: EventEmitter<any> = new EventEmitter();

  public async fileCheck(files: File[]): Promise<boolean> {
    try {
      await this.checkSize(files);
      await this.checkType(files);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(false);
    }
  }

  private checkSize(files: File[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let fileSizes = true;
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const fileSize = file.size;
        if (fileSize > uploadFileSize) {
          fileSizes = false;
        }
      }
      return fileSizes ? resolve(true) : reject(false);
    });
  }
  private checkType(files: File[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let fileExtensions = true;
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const fileName = file.name;
        const splittedFileName = fileName.split('.');
        const fileExtension = splittedFileName[splittedFileName.length - 1].toLowerCase();
        const finder = fileTypes.includes(fileExtension.toLowerCase());
        if (!finder) {
          fileExtensions = false;
        }
      }
      return fileExtensions ? resolve(true) : reject(false);
    });
  }

  public upload(fd): Observable<any> {
    const customHeaders = new HttpHeaders({
      enctype: 'multipart/form-data'
    });
    return this.http.post(`${baseUrl + urls.media.uploadMany}`, fd, {
      headers: customHeaders,
      reportProgress: true,
      observe: 'events'
    });
  }

  public availabeTypes(): string {
    return fileTypes
      .map(type => `.${type}`)
      .join(',');
  }
}
