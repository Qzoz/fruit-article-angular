import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EButtonColorType } from 'src/app/enums/e-button-color-type';
import { EButtonType } from 'src/app/enums/e-button-type';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'fang-create-article-form',
  templateUrl: './create-article-form.component.html',
  styleUrls: ['./create-article-form.component.scss'],
})
export class CreateArticleFormComponent implements OnInit, OnDestroy {
  @Input('data') editData!: any;

  @Output('onUpdate') onArticleUpdated: EventEmitter<any> =
    new EventEmitter<any>();

  formGroup!: FormGroup;
  isLoading: boolean = false;

  FieldNames = FieldNames;
  ButtonType = EButtonType;
  ButtonColorType = EButtonColorType;

  private _apiSubscription!: Subscription;

  readonly JSON_ID_KEY = '_id';

  constructor(
    private _apiService: ApiService,
    private _snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.prepareFormGroup();
  }

  prepareFormGroup(): void {
    this.formGroup = new FormGroup({
      [FieldNames.URL]: new FormControl('', Validators.required),
      [FieldNames.TITLE]: new FormControl('', Validators.required),
      [FieldNames.DESCRIPTION]: new FormControl('', Validators.required),
    });
    if (this.editData) {
      if (this.editData[FieldNames.URL]) {
        this.formGroup
          .get(FieldNames.URL)
          ?.setValue(this.editData[FieldNames.URL]);
      }
      if (this.editData[FieldNames.TITLE]) {
        this.formGroup
          .get(FieldNames.TITLE)
          ?.setValue(this.editData[FieldNames.TITLE]);
      }
      if (this.editData[FieldNames.DESCRIPTION]) {
        this.formGroup
          .get(FieldNames.DESCRIPTION)
          ?.setValue(this.editData[FieldNames.DESCRIPTION]);
      }
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.formGroup.disable();

      const observable = this.editData
        ? this._apiService.updateArticle(
            this.editData[this.JSON_ID_KEY],
            this.formGroup.value
          )
        : this._apiService.createArticle(this.formGroup.value);

      this._apiSubscription = observable.subscribe(
        (response) => {
          this.isLoading = false;
          this.formGroup.enable();
          if (response) {
            this.formGroup.reset();
            this._snackbarService.showSnackbar(
              `${this.editData ? 'Updated' : 'Created'} Successfully`
            );

            if (this.editData && this.onArticleUpdated?.observers?.length) {
              this.onArticleUpdated.emit();
            }
          } else {
            this._snackbarService.showSnackbar(
              `${this.editData ? 'Updation' : 'Creation'} Failed`
            );
          }
        },
        (error) => {
          this.isLoading = false;
          this.formGroup.enable();
          this._snackbarService.showSnackbar(error.message);
        }
      );
    } else {
      this._snackbarService.showSnackbar('Invalid Entries');
    }
  }

  ngOnDestroy(): void {
    if (this._apiSubscription) {
      this._apiSubscription.unsubscribe();
    }
  }
}

enum FieldNames {
  URL = 'url',
  TITLE = 'title',
  DESCRIPTION = 'description',
}
