import { Type } from '@angular/core';

export interface IColumnData {
  key: string;
  name: string;
  component?: Type<any>;
  componentData?: (rowData: any, index?: number) => any;
}
