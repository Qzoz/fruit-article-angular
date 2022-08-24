import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { IMultiButtonData } from 'src/app/interfaces/i-multi-button-data';

@Component({
  selector: 'fang-multi-button-wrapper',
  templateUrl: './multi-button-wrapper.component.html',
  styleUrls: ['./multi-button-wrapper.component.scss'],
})
export class MultiButtonWrapperComponent implements OnInit {
  @Input('multiButtonData') multiButtonData!: IMultiButtonData;

  @HostBinding('style.justify-content') justifyContent = 'flex-end';
  @HostBinding('style.align-items') alignItems = 'center';

  buttonMarginH = '0';
  buttonMarginV = '0';

  constructor() {}

  ngOnInit(): void {
    if (this.multiButtonData && this.multiButtonData.layout) {
      if (this.multiButtonData.layout.justifyContent) {
        this.justifyContent = this.multiButtonData.layout.justifyContent;
      }
      if (this.multiButtonData.layout.alignItems) {
        this.alignItems = this.multiButtonData.layout.alignItems;
      }
      if (this.multiButtonData.layout.buttonMarginH) {
        this.buttonMarginH = this.multiButtonData.layout.buttonMarginH;
      }
      if (this.multiButtonData.layout.buttonMarginV) {
        this.buttonMarginV = this.multiButtonData.layout.buttonMarginV;
      }
    }
  }
}
