import { ComponentType } from '@angular/cdk/portal';
import { createInjectorType } from '@angular/compiler/src/render3/r3_injector_compiler';
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalInjectedData } from 'src/app/classes/modal-injected-data';

@Component({
  selector: 'fang-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild('componentLoader') templateRef!: TemplateRef<any>;
  public component!: Type<any>;
  public injector!: Injector;

  constructor(
    private _injector: Injector,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.component = this.data.component;
    delete this.data.component;
    this.createInjector();
  }

  createInjector() {
    this.injector = Injector.create({
      providers: [
        {
          provide: ModalInjectedData,
          useValue: {
            modalData: this.data,
            modalRef: this._dialogRef,
          },
        },
      ],
      parent: this._injector,
    });
  }
}
