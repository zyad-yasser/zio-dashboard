import { Component, OnInit, HostListener } from '@angular/core';
import { MediaService } from 'src/app/services/media/media.service';
import { ImportService } from 'src/app/services/import/import.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.sass']
})
export class ImageListComponent implements OnInit {
  public media: any[] = [];
  public isScrolling;

  public scroll(event?): void {
    const el = event.target;
    const scrollHeight = el.scrollHeight;
    const scrollPos = el.scrollTop;
    const clientHeight = el.clientHeight;
    clearTimeout(this.isScrolling);
    this.isScrolling = setTimeout(
      () => {
        if ((scrollHeight - 50) <= (scrollPos + clientHeight)) {
          this.list();
          clearTimeout(this.isScrolling);
        }
      },
      200
    );
  }

  constructor(private mediaService: MediaService, private importService: ImportService) { }

  public list() {
    const number = this.media.length;
    this.mediaService.list(number)
      .subscribe((media: any) => {
        this.media = [...this.media, ...media];
      });
  }

  public attachEvents(): void {
    this.importService.newData.subscribe((res) => {
      this.media = [...res, ...this.media];
    });
  }

  ngOnInit() {
    this.list();
    this.attachEvents();
  }
}
