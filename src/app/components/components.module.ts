import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Module Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

// Custom Components Imports
import { NavHeadComponent } from './nav/nav-head/nav-head.component';
import { NavItemsComponent } from './nav/nav-items/nav-items.component';
import { NavItemComponent } from './nav/nav-item/nav-item.component';
import { NavFooterComponent } from './nav/nav-footer/nav-footer.component';
import { DirectivesModule } from '../directives/directives.module';
import { CreateArticleFormComponent } from './main/create-article/create-article-form/create-article-form.component';
import { ButtonComponent } from './button/button.component';
import { TablePaginatedComponent } from './table-paginated/table-paginated.component';
import { ButtonWrapperComponent } from './button-wrapper/button-wrapper.component';
import { ConfirmationModalComponent } from './modal/templates/confirmation-modal/confirmation-modal.component';
import { ModalComponent } from './modal/modal.component';
import { ModalLayoutComponent } from './modal/modal-layout/modal-layout.component';

const commonComponents = [
  NavHeadComponent,
  NavItemsComponent,
  NavItemComponent,
  NavFooterComponent,

  CreateArticleFormComponent,

  ButtonComponent,
  ButtonWrapperComponent,
  TablePaginatedComponent,

  ConfirmationModalComponent,
  ModalComponent,
  ModalLayoutComponent,
];

@NgModule({
  declarations: [...commonComponents],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // Custom Modules
    DirectivesModule,

    // Material modules
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  exports: [
    ...commonComponents,
    // Custom Modules
    DirectivesModule,

    // Material Modules
    MatSidenavModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
})
export class ComponentsModule {}
