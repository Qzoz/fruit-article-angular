import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fang-home-article',
  templateUrl: './home-article.component.html',
  styleUrls: ['./home-article.component.scss'],
})
export class HomeArticleComponent implements OnInit {
  tilesDetail: {
    tileText: string;
    routeLink: string;
    tileIcon: string;
  }[] = [
    {
      tileText: 'Create',
      routeLink: '/create-article',
      tileIcon: 'create',
    },
    {
      tileText: 'List',
      routeLink: '/list-article',
      tileIcon: 'view_list',
    },
    {
      tileText: 'View',
      routeLink: '/view-article',
      tileIcon: 'view_agenda',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
