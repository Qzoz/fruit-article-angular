import { ComponentType } from '@angular/cdk/portal';
import { Type } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

export interface IModalData {
  componentToLoad: Type<any>;
  modalConfig?: MatDialogConfig<any>;
  onModalClosed?: Function;
}
