import { Component, Inject, OnInit, Input } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-media-choose',
  templateUrl: './media-choose.component.html',
  styleUrls: ['./media-choose.component.sass']
})
export class MediaChooseComponent implements OnInit {
  @Input() public area: string;

  constructor(
    public dialogRef: MatDialogRef<MediaChooseComponent>,
    private mediaService: MediaService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public attachEvents(): void {
    this.mediaService.selectForInline
      .subscribe(
        (res) => {
          this.dialogRef.close(res);
        }
      );
  }

  public close(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.attachEvents();
  }
}
