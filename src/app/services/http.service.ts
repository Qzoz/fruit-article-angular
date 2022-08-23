import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EApiMethods } from '../enums/e-api-methods';
import { IApi } from '../interfaces/i-api';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  hit(apiInfo: IApi) {
    if (apiInfo && apiInfo.url) {
      const finalUrl =
        this.BASE_URL +
        (apiInfo.url.startsWith('/') ? apiInfo.url : '/' + apiInfo.url);

      let request = null;
      switch (apiInfo.method) {
        case EApiMethods.POST:
          request = this.http.post(
            finalUrl,
            apiInfo.input ? apiInfo.input : {},
            {
              responseType: 'json',
            }
          );
          break;
        case EApiMethods.PUT:
          request = this.http.put(
            finalUrl,
            apiInfo.input ? apiInfo.input : {},
            {
              responseType: 'json',
            }
          );
          break;
        case EApiMethods.DELETE:
          request = this.http.delete(finalUrl, {
            responseType: 'json',
          });
          break;
        default:
          request = this.http.get(finalUrl, {
            responseType: 'json',
          });
          break;
      }
      if (!!request) {
        request
          .pipe(
            catchError((error) => {
              apiInfo.onFailure(error);
              return of(null);
            })
          )
          .subscribe((response) => {
            apiInfo.onSuccess(response);
          });
      }
    }
  }
}
