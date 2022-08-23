import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class ModalInjectedData {
  modalData!: any;
  modalRef!: MatDialogRef<any>;
}
