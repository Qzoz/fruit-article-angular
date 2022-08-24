import { IButtonData } from './i-button-data';

export interface IMultiButtonData {
  buttonDataInputs: IButtonData[];
  layout?: {
    buttonMarginH?: string;
    buttonMarginV?: string;
    justifyContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-evenly'
      | 'space-around';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  };
}
