import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[fangModalFoot]',
})
export class ModalFootDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
