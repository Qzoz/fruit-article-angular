import { Component, OnDestroy, OnInit } from '@angular/core';
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
  formGroup!: FormGroup;
  isLoading: boolean = false;

  FieldNames = FieldNames;
  ButtonType = EButtonType;
  ButtonColorType = EButtonColorType;

  private _apiSubscription!: Subscription;

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
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.formGroup.disable();

      this._apiSubscription = this._apiService
        .createArticle(this.formGroup.value)
        .subscribe(
          (response) => {
            this.isLoading = false;
            this.formGroup.enable();
            if (response) {
              this.formGroup.reset();
              this._snackbarService.showSnackbar('Created Successfully');
            } else {
              this._snackbarService.showSnackbar('Creation Failed');
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
