import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponentWrapperDirective } from './table-component-wrapper.directive';
import { ModalHeadDirective } from './modal/modal-head.directive';
import { ModalFootDirective } from './modal/modal-foot.directive';

const common = [
  TableComponentWrapperDirective,
  ModalHeadDirective,
  ModalFootDirective,
];

@NgModule({
  declarations: [...common],
  imports: [CommonModule],
  exports: [...common],
})
export class DirectivesModule {}
