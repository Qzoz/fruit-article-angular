import { Component, Input, OnInit } from '@angular/core';
import { EButtonColorType } from 'src/app/enums/e-button-color-type';
import { EButtonType } from 'src/app/enums/e-button-type';
import { IButtonData } from 'src/app/interfaces/i-button-data';

@Component({
  selector: 'fang-button-wrapper',
  templateUrl: './button-wrapper.component.html',
  styleUrls: ['./button-wrapper.component.scss'],
})
export class ButtonWrapperComponent implements OnInit {
  @Input('buttonData') buttonData!: IButtonData;

  buttonName!: string;
  buttonColorType!: EButtonColorType;
  buttonType!: EButtonType;
  loader: boolean = false;
  disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.initButtonVars();
  }

  tableInit(data: any) {
    this.buttonData = data;
    this.initButtonVars();
  }

  initButtonVars() {
    if (this.buttonData) {
      this.buttonName = this.buttonData.buttonName
        ? this.buttonData.buttonName
        : '';
      this.buttonColorType = this.buttonData.buttonColorType
        ? this.buttonData.buttonColorType
        : EButtonColorType.DEFAULT;
      this.buttonType = this.buttonData.buttonType
        ? this.buttonData.buttonType
        : EButtonType.DEFAULT;
      this.loader = this.buttonData.loader ? this.buttonData.loader : false;
      this.disabled = this.buttonData.disabled
        ? this.buttonData.disabled
        : false;
    }
  }

  onClick() {
    if (this.buttonData && this.buttonData.function) {
      this.buttonData.function(this);
    }
  }
}
