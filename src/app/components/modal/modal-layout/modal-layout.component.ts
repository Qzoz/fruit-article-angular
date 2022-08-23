import { AfterViewInit, Component, ContentChild, OnInit } from '@angular/core';
import { ModalFootDirective } from 'src/app/directives/modal/modal-foot.directive';
import { ModalHeadDirective } from 'src/app/directives/modal/modal-head.directive';

@Component({
  selector: 'fang-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
})
export class ModalLayoutComponent implements OnInit {
  @ContentChild(ModalHeadDirective) modalHead!: ModalHeadDirective;
  @ContentChild(ModalFootDirective) modalFoot!: ModalFootDirective;

  constructor() {}

  ngOnInit(): void {}
}
