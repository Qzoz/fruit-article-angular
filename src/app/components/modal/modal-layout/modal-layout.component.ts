import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { ModalFootDirective } from 'src/app/directives/modal/modal-foot.directive';
import { ModalHeadDirective } from 'src/app/directives/modal/modal-head.directive';
import { EButtonColorType } from 'src/app/enums/e-button-color-type';
import { EButtonType } from 'src/app/enums/e-button-type';

@Component({
  selector: 'fang-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
})
export class ModalLayoutComponent implements OnInit {
  @Input('noBodyPadding') noBodyPadding: boolean = false;

  @ContentChild(ModalHeadDirective) modalHead!: ModalHeadDirective;
  @ContentChild(ModalFootDirective) modalFoot!: ModalFootDirective;

  ButtonType = EButtonType;
  ButtonColorType = EButtonColorType;

  constructor() {}

  ngOnInit(): void {}

  onCloseClicked() {
    if (!!this.modalHead?.onCloseClicked?.observers?.length) {
      this.modalHead.onCloseClicked.emit();
    }
  }
}
