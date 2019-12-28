import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  public backdropBlur(type): any {
    const appContainer = document.querySelector('app-root');
    return type === 'add'
      ? appContainer.classList.add('blur')
      : appContainer.classList.remove('blur');
  }

  public init(componentInstance, modalComponent, afterClosedCb?, config?): void {
    componentInstance.dialogRef = componentInstance.dialog.open(modalComponent, config);
    componentInstance.dialogRef
      .afterClosed()
      .subscribe(
        (result) => {
          this.backdropBlur('remove');
          if (afterClosedCb) {
            afterClosedCb.call(componentInstance, result);
          }
        });
    this.backdropBlur('add');
  }
}
