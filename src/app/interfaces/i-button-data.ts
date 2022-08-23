import { EButtonColorType } from '../enums/e-button-color-type';
import { EButtonType } from '../enums/e-button-type';

export interface IButtonData {
  buttonName?: string;
  buttonColorType?: EButtonColorType;
  buttonType?: EButtonType;
  prefixIcon?: string;
  suffixIcon?: string;
  loader?: boolean;
  disabled?: boolean;
  function: Function;
}
