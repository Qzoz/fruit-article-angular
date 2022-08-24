import { Directive, Input, TemplateRef } from '@angular/core';
import { IButtonData } from 'src/app/interfaces/i-button-data';
import { IMultiButtonData } from 'src/app/interfaces/i-multi-button-data';

@Directive({
  selector: '[fangModalFoot]',
})
export class ModalFootDirective {
  @Input('multiButtonData') public multiButtonData!: IMultiButtonData;

  constructor(public templateRef: TemplateRef<any>) {}
}
