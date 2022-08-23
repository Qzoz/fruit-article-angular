import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EButtonColorType } from 'src/app/enums/e-button-color-type';
import { EButtonType } from 'src/app/enums/e-button-type';

@Component({
  selector: 'fang-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input('loader') loader: boolean = false;
  @Input('disabled') disabled: boolean = false;
  @Input('prefixIcon') prefixIcon!: string;
  @Input('suffixIcon') suffixIcon!: string;

  @Input('type') buttonType!: EButtonType;
  @Input('color') buttonColorType!: EButtonColorType;

  @Output('onClick') click: EventEmitter<any> = new EventEmitter<any>();

  ButtonType = EButtonType;

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.click.emit();
  }
}
