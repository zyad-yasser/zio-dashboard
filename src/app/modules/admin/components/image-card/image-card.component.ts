import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { baseUrl } from 'src/app/statics/constants';
import { urls } from 'src/app/statics/urls';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.sass']
})
export class ImageCardComponent implements OnInit {
  @Input() public data: any;
  @Input() public option: string;
  @Input() public active: boolean;
  @Output() public deleteEvent : EventEmitter<any> = new EventEmitter();
  @ViewChild('image', { static: false }) image: ElementRef;
  public imageUrl = '/assets/images/logo.png';
  public failed = false;

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef, private http: HttpClient) { }

  public parseImage(): any {
    const url = baseUrl + urls.media.oneUrl + this.data.url;
    return this.http.get(url, { responseType: 'blob' });
  }

  public copyLink(): void {
    const url = baseUrl + urls.media.oneUrl + this.data.url;
    const el = document.createElement('textarea');
    el.value = url;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  public activate(): void {
    this.active = true;
  }

  public delete(): void {
    this.deleteEvent.emit();
  }

  public ngOnInit(): void {
    this.parseImage()
      .subscribe(
        () => {
          const url = baseUrl + urls.media.oneUrl + this.data.url;
          this.imageUrl = url;
          this.image.nativeElement.style.backgroundImage = `url('${this.imageUrl}')`;
          this.cdr.detectChanges();
        },
        () => {
          this.failed = true;
        }
      );
  }
}
