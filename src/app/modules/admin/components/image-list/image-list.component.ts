import { Component, OnInit, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { MediaService } from 'src/app/services/media/media.service';
import { ImportService } from 'src/app/services/import/import.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.sass']
})
export class ImageListComponent implements OnInit {
  @Input() public area: string;
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

  public handleClick(index: number): void {
    this.media[index].active = this.media[index].active
      ? false
      : true;
    if (this.area === 'inline') {
      const selectedImage = this.media[index];
      this.mediaService.selectForInline.emit(selectedImage);
    }
  }

  ngOnInit() {
    this.list();
    this.attachEvents();
  }
}
