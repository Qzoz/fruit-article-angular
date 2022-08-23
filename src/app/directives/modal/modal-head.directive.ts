import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[fangModalHead]',
})
export class ModalHeadDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
