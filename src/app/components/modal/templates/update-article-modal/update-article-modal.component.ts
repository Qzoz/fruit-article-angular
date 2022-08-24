import { Component, OnInit } from '@angular/core';
import { ModalInjectedData } from 'src/app/classes/modal-injected-data';

@Component({
  selector: 'fang-update-article-modal',
  templateUrl: './update-article-modal.component.html',
  styleUrls: ['./update-article-modal.component.scss'],
})
export class UpdateArticleModalComponent implements OnInit {
  articleData!: any;
  onUpdateCallback!: Function;

  constructor(public modalData: ModalInjectedData) {}

  ngOnInit(): void {
    this.articleData = this.modalData.modalData?.articleData;
    this.onUpdateCallback = this.modalData.modalData?.onUpdated;
  }

  onUpdate() {
    if (this.onUpdateCallback) {
      this.onUpdateCallback();
    }
  }
}
