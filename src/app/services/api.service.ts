import { EApiMethods } from './../enums/e-api-methods';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { IApi } from '../interfaces/i-api';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly ARTICLE_ENDPOINT = '/article';

  constructor(private httpService: HttpService) {}

  private hitApi(
    url: string,
    method: EApiMethods = EApiMethods.GET,
    input?: any
  ): Observable<any> {
    const apiObservable = new Subject<any>();
    const apiInfo: IApi = {
      method: method,
      url: url,
      input: input,
      onFailure: (error) => {
        apiObservable.error(error);
      },
      onSuccess: (response) => {
        apiObservable.next(response);
      },
    };
    this.httpService.hit(apiInfo);
    return apiObservable;
  }

  createArticle(article: {
    url: string;
    title: string;
    description: string;
  }): Observable<any> {
    if (article) {
      return this.hitApi(this.ARTICLE_ENDPOINT, EApiMethods.POST, article);
    }
    return of(null);
  }

  updateArticle(
    id: string,
    article: {
      url: string;
      title: string;
      description: string;
    }
  ): Observable<any> {
    if (!!id && !!article) {
      return this.hitApi(
        [this.ARTICLE_ENDPOINT, id].join('/'),
        EApiMethods.PUT,
        article
      );
    }
    return of(null);
  }

  deleteArticle(id: string): Observable<any> {
    if (!!id) {
      return this.hitApi(
        [this.ARTICLE_ENDPOINT, id].join('/'),
        EApiMethods.DELETE
      );
    }
    return of(null);
  }

  listArticle(): Observable<any> {
    return this.hitApi(this.ARTICLE_ENDPOINT);
  }

  getArticle(id: string): Observable<any> {
    if (!!id) {
      return this.hitApi([this.ARTICLE_ENDPOINT, id].join('/'));
    }
    return of(null);
  }
}
