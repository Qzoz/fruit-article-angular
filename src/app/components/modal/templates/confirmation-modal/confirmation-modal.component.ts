import { Component, OnInit } from '@angular/core';
import { ModalInjectedData } from 'src/app/classes/modal-injected-data';

@Component({
  selector: 'fang-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  constructor(public modalData: ModalInjectedData) {
    console.log(modalData);
  }

  ngOnInit(): void {}
}
