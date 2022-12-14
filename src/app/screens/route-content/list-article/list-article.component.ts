import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonWrapperComponent } from 'src/app/components/button-wrapper/button-wrapper.component';
import { UpdateArticleModalComponent } from 'src/app/components/modal/templates/update-article-modal/update-article-modal.component';
import { MultiButtonWrapperComponent } from 'src/app/components/multi-button-wrapper/multi-button-wrapper.component';
import { EButtonColorType } from 'src/app/enums/e-button-color-type';
import { EButtonType } from 'src/app/enums/e-button-type';
import { IButtonData } from 'src/app/interfaces/i-button-data';
import { IColumnData } from 'src/app/interfaces/i-column-data';
import { IMultiButtonData } from 'src/app/interfaces/i-multi-button-data';
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
  private _deleteApiSubscription!: Subscription;

  constructor(
    private _apiService: ApiService,
    private _snackbarService: SnackbarService,
    private _modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.updateList();
  }

  updateList() {
    if (this._apiSubscription) {
      this._apiSubscription.unsubscribe();
    }
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
        key: ArticleJsonKeys.ID,
        name: 'ID',
      },
      // {
      //   key: ArticleJsonKeys.URL,
      //   name: 'URL',
      // },
      {
        key: ArticleJsonKeys.TITLE,
        name: 'Title',
      },
      // {
      //   key: ArticleJsonKeys.DESCRIPTION,
      //   name: 'Description',
      // },
      {
        key: ArticleJsonKeys.DAY,
        name: 'Day',
      },
      {
        key: ArticleJsonKeys.MONTH,
        name: 'Month',
      },
      {
        key: ArticleJsonKeys.ACTION,
        name: 'Action',
        headerTextAlign: 'center',
        component: MultiButtonWrapperComponent,
        componentData: (rowData: any) => {
          const multiButtonData: IMultiButtonData = {
            buttonDataInputs: [
              {
                buttonName: 'Edit',
                buttonColorType: EButtonColorType.PRIMARY,
                buttonType: EButtonType.STROKED,
                function: () => {
                  this.onUpdateEntry(rowData);
                },
              },
              {
                buttonName: 'Delete',
                buttonColorType: EButtonColorType.WARN,
                function: (buttonRef: any) => {
                  this.onDeleteEntry(rowData, buttonRef);
                },
              },
            ],
            layout: {
              alignItems: 'center',
              justifyContent: 'center',
              buttonMarginH: '5px',
            },
          };
          return multiButtonData;
        },
      },
    ];
  }

  onDeleteEntry(data: any, tableButtonRef: any) {
    this._modalService.openConfirmationModal({
      modalHeading: 'Delete Article',
      confirmationMessage: `Are you sure to delete <b>'${
        data[ArticleJsonKeys.ID]
      }'</b> ?`,
      function: (buttonRef: any, modalRef: any) => {
        buttonRef.loader = true;
        tableButtonRef.loader = true;
        this.deleteArticle(
          data[ArticleJsonKeys.ID],
          () => {
            buttonRef.loader = false;
            tableButtonRef.loader = false;
            modalRef.close();
            this.updateList();
            this._snackbarService.showSnackbar('Deleted Successfully');
          },
          () => {
            buttonRef.loader = false;
            tableButtonRef.loader = false;
            this._snackbarService.showSnackbar('Failed to delete');
          }
        );
      },
    });
  }

  deleteArticle(articleId: string, onSuccess: Function, onFaliure: Function) {
    this._apiService.deleteArticle(articleId).subscribe(
      (response) => {
        onSuccess(response);
      },
      (error) => {
        onFaliure(error);
      }
    );
  }

  onUpdateEntry(data: any) {
    this._modalService.openModal({
      componentToLoad: UpdateArticleModalComponent,
      modalConfig: {
        minWidth: '70vw',
        disableClose: true,
        data: {
          articleData: data,
          onUpdated: () => {
            this.updateList();
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    if (this._apiSubscription) {
      this._apiSubscription.unsubscribe();
    }
    if (this._deleteApiSubscription) {
      this._deleteApiSubscription.unsubscribe();
    }
  }
}

enum ArticleJsonKeys {
  ID = '_id',
  URL = 'url',
  TITLE = 'title',
  DESCRIPTION = 'description',
  DAY = 'date_day',
  MONTH = 'date_month',
  ACTION = 'action',
}
