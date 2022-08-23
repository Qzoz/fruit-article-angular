import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavContentComponent } from './nav-content/nav-content.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ComponentsModule } from '../components/components.module';
import { CreateArticleComponent } from './route-content/create-article/create-article.component';
import { ListArticleComponent } from './route-content/list-article/list-article.component';
import { ViewArticleComponent } from './route-content/view-article/view-article.component';
import { HomeArticleComponent } from './route-content/home-article/home-article.component';
import { NotFoundComponent } from './route-content/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { ContentLayoutComponent } from './route-content/content-layout/content-layout.component';

const commonComponents = [NavContentComponent, MainContentComponent];

@NgModule({
  declarations: [
    ...commonComponents,
    CreateArticleComponent,
    ListArticleComponent,
    ViewArticleComponent,
    HomeArticleComponent,
    NotFoundComponent,
    ContentLayoutComponent,
  ],
  imports: [CommonModule, ComponentsModule, AppRoutingModule],
  exports: [...commonComponents, ComponentsModule],
})
export class ScreensModule {}
