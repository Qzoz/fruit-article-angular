import { MatDialogConfig } from '@angular/material/dialog';

export interface IConfirmModalData {
  modalConfig?: MatDialogConfig<any>;
  onModalClosed?: Function;
  modalHeading?: string;
  confirmationMessage?: string;
  function?: Function;
  cancelFunction?: Function;
}
