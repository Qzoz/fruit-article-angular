import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { IModalData } from '../interfaces/i-modal-data';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly COMPONENT_KEY = 'component';

  constructor(private _matDialog: MatDialog) {}

  openModal(modalData: IModalData) {
    if (modalData && !modalData.modalConfig) {
      modalData.modalConfig = {};
    }
    if (modalData && modalData.modalConfig && modalData.modalConfig.data) {
      modalData.modalConfig.data[this.COMPONENT_KEY] =
        modalData.componentToLoad;
    }
    const dialogRef = this._matDialog.open(
      ModalComponent,
      modalData.modalConfig
    );

    dialogRef.afterClosed().subscribe(() => {
      if (modalData.onModalClosed) {
        modalData.onModalClosed();
      }
    });
  }
}
