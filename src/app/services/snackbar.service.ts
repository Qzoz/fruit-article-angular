import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _matSnackBar: MatSnackBar) {}

  showSnackbar(message: string, duration: number = 3000) {
    this._matSnackBar.open(message, undefined, {
      duration: duration,
    });
  }
}
