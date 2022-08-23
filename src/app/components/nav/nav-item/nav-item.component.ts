import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fang-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements OnInit {
  @Input('icon') icon!: string;
  @Input('link') link!: string;

  constructor() {}

  ngOnInit(): void {}
}
