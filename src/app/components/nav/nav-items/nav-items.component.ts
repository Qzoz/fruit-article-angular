import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fang-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss'],
})
export class NavItemsComponent implements OnInit {
  navItems: {
    text: string;
    path: string;
    icon: string;
  }[] = [
    {
      text: 'Create',
      path: '/create-article',
      icon: 'create',
    },
    {
      text: 'List',
      path: '/list-article',
      icon: 'view_list',
    },
    {
      text: 'View',
      path: '/view-article',
      icon: 'view_agenda',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
