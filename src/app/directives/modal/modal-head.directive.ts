import {
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';

@Directive({
  selector: '[fangModalHead]',
})
export class ModalHeadDirective implements OnInit {
  @Input('modalHeading') public modalHeading!: string;
  @Input('hideClose') public hideCloseButton: boolean = false;

  @Output('closeClicked') public onCloseClicked: EventEmitter<any> =
    new EventEmitter<any>();

  constructor(public templateRef: TemplateRef<any>) {}

  ngOnInit(): void {}
}
