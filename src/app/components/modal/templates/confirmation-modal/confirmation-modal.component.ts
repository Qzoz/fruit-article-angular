import { Component, OnInit } from '@angular/core';
import { ModalInjectedData } from 'src/app/classes/modal-injected-data';
import { ButtonWrapperComponent } from 'src/app/components/button-wrapper/button-wrapper.component';
import { EButtonColorType } from 'src/app/enums/e-button-color-type';
import { EButtonType } from 'src/app/enums/e-button-type';
import { IMultiButtonData } from 'src/app/interfaces/i-multi-button-data';

@Component({
  selector: 'fang-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  multiButtonData!: IMultiButtonData;
  modalHeading!: string;
  confirmationMessage!: string;
  onConfirmationClicked!: Function;
  onCancelClicked!: Function;

  constructor(public modalData: ModalInjectedData) {}

  ngOnInit(): void {
    this.confirmationMessage = this.modalData.modalData?.confirmationMessage;
    this.onConfirmationClicked = this.modalData.modalData?.function;
    this.onCancelClicked = this.modalData.modalData?.cancelFunction;
    this.modalHeading = this.modalData.modalData?.modalHeading;

    this.prepareButton();
  }

  prepareButton() {
    this.multiButtonData = {
      buttonDataInputs: [
        {
          buttonName: 'Cancel',
          buttonType: EButtonType.STROKED,
          buttonColorType: EButtonColorType.DEFAULT,
          function: () => {
            if (this.onCancelClicked) {
              this.onCancelClicked();
            }
            this.modalData.modalRef.close();
          },
        },
        {
          buttonName: 'Confirm',
          buttonType: EButtonType.FLAT,
          buttonColorType: EButtonColorType.WARN,
          function: (buttonRef: ButtonWrapperComponent) => {
            if (this.onConfirmationClicked) {
              this.onConfirmationClicked(buttonRef, this.modalData.modalRef);
            }
          },
        },
      ],
      layout: {
        justifyContent: 'space-between',
      },
    };
  }
}
