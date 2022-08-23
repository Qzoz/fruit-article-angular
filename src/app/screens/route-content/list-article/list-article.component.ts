import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonWrapperComponent } from 'src/app/components/button-wrapper/button-wrapper.component';
import { ConfirmationModalComponent } from 'src/app/components/modal/templates/confirmation-modal/confirmation-modal.component';
import { EButtonColorType } from 'src/app/enums/e-button-color-type';
import { IButtonData } from 'src/app/interfaces/i-button-data';
import { IColumnData } from 'src/app/interfaces/i-column-data';
import { ApiService } from 'src/app/services/api.service';
import { ModalService } from 'src/app/services/modal.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'fang-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
})
export class ListArticleComponent implements OnInit, OnDestroy {
  articleList!: any[];
  columnDataList!: IColumnData[];

  loader: boolean = false;
  loadingError!: string;

  private _apiSubscription!: Subscription;

  constructor(
    private _apiService: ApiService,
    private _snackbarService: SnackbarService,
    private _modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this._apiSubscription = this._apiService.listArticle().subscribe(
      (response) => {
        this.loader = false;
        this.articleList = response;
        this.prepareColumnData();
      },
      (error) => {
        this.loader = false;
        this.loadingError = error.message;
        this._snackbarService.showSnackbar('Error Listing Articles');
      }
    );
  }

  prepareColumnData() {
    this.columnDataList = [
      {
        key: '_id',
        name: 'ID',
      },
      // {
      //   key: 'url',
      //   name: 'URL',
      // },
      {
        key: 'title',
        name: 'Title',
      },
      // {
      //   key: 'description',
      //   name: 'Description',
      // },
      {
        key: 'date_day',
        name: 'Day',
      },
      {
        key: 'date_month',
        name: 'Month',
      },
      {
        key: 'action',
        name: 'Action',
        component: ButtonWrapperComponent,
        componentData: (rowData: any, index?: number): IButtonData => {
          return {
            buttonName: 'Delete',
            buttonColorType: EButtonColorType.WARN,
            function: (buttonRef: any) => {
              this.onDeleteEntry(rowData);
            },
          };
        },
      },
    ];
  }

  onDeleteEntry(data?: any) {
    this._modalService.openModal({
      componentToLoad: ConfirmationModalComponent,
      modalConfig: {
        width: '60vw',
        height: '70vh',
        data: data,
      },
      onModalClosed: () => {
        console.log('closed');
      },
    });
  }

  ngOnDestroy(): void {
    if (this._apiSubscription) {
      this._apiSubscription.unsubscribe();
    }
  }
}
