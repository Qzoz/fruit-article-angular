import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { ConfirmationModalComponent } from '../components/modal/templates/confirmation-modal/confirmation-modal.component';
import { IConfirmModalData } from '../interfaces/i-confirm-modal-data';
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

  openConfirmationModal(confirmModalData: IConfirmModalData) {
    if (confirmModalData) {
      const confirmData = {
        confirmationMessage: confirmModalData.confirmationMessage,
        function: confirmModalData.function,
        cancelFunction: confirmModalData.cancelFunction,
        modalHeading: confirmModalData.modalHeading,
      };
      let modalConfig = confirmModalData?.modalConfig;
      if (!modalConfig) {
        modalConfig = {
          maxHeight: '90vh',
          minWidth: '40vw',
          data: confirmData,
        };
      } else {
        modalConfig.data = {
          ...modalConfig.data,
          ...confirmData,
        };
      }
      this.openModal({
        componentToLoad: ConfirmationModalComponent,
        modalConfig: modalConfig,
        onModalClosed: confirmModalData.onModalClosed,
      });
    }
  }
}
