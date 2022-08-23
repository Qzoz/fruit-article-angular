import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[fangTableComponentWrapper]',
})
export class TableComponentWrapperDirective implements OnInit, OnDestroy {
  private readonly COMP_INIT_METHOD = 'tableInit';

  @Input('componentToLoad') componentToLoad!: Type<any>;
  @Input('data') data!: any;

  private _componentRef!: ComponentRef<any>;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    if (this._viewContainerRef && this.componentToLoad) {
      this._viewContainerRef.clear();
      const component = this._componentFactoryResolver.resolveComponentFactory(
        this.componentToLoad
      );
      this._componentRef =
        this._viewContainerRef.createComponent<any>(component);
      if (
        this._componentRef &&
        this._componentRef.instance[this.COMP_INIT_METHOD]
      ) {
        this._componentRef.instance[this.COMP_INIT_METHOD](this.data);
      }
    }
  }

  ngOnDestroy(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
  }
}
