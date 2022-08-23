import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateArticleComponent } from './route-content/create-article/create-article.component';
import { HomeArticleComponent } from './route-content/home-article/home-article.component';
import { ListArticleComponent } from './route-content/list-article/list-article.component';
import { NotFoundComponent } from './route-content/not-found/not-found.component';
import { ViewArticleComponent } from './route-content/view-article/view-article.component';

const routes: Routes = [
  { path: 'create-article', component: CreateArticleComponent },
  { path: 'list-article', component: ListArticleComponent },
  { path: 'view-article', component: ViewArticleComponent },
  { path: '', component: HomeArticleComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
