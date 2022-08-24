import { Type } from '@angular/core';

export interface IColumnData {
  key: string;
  name: string;
  headerTextAlign?: 'left' | 'right' | 'center' | 'justify';
  component?: Type<any>;
  componentData?: (rowData: any, index?: number) => any;
}
