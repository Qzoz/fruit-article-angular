import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IColumnData } from 'src/app/interfaces/i-column-data';

@Component({
  selector: 'fang-table-paginated',
  templateUrl: './table-paginated.component.html',
  styleUrls: ['./table-paginated.component.scss'],
})
export class TablePaginatedComponent implements OnInit, AfterViewInit {
  public readonly S_NO_KEY = 'sno';
  public readonly S_NO_LABEL = 'S. No.';

  @Input('showSerialNo') showSerialNo: boolean = false;
  @Input('dataList') inputDataList!: any[];
  @Input('columnList') columnDataList!: IColumnData[];

  pageSizeOptions: number[] = [5, 10, 20];

  displayedColumns!: string[];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    if (this.showSerialNo) {
      this.inputDataList.forEach((inputData, index) => {
        inputData[this.S_NO_KEY] = index + 1;
      });
      this.columnDataList.unshift({
        key: this.S_NO_KEY,
        name: this.S_NO_LABEL,
      });
    }
    const keyArrayMap = new Map<string, Function>();
    this.displayedColumns = this.columnDataList.map((column: IColumnData) => {
      if (column.component && column.componentData) {
        keyArrayMap.set(column.key, column.componentData);
      }
      return column.key;
    });
    if (keyArrayMap.size) {
      this.inputDataList.forEach((inputData, index) => {
        for (let [key, cFun] of keyArrayMap.entries()) {
          inputData[key] = cFun(inputData, index);
        }
      });
    }
    this.dataSource = new MatTableDataSource<any>(this.inputDataList);
  }

  ngAfterViewInit(): void {
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
