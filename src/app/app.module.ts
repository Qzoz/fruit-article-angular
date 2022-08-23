import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Custom Modules Imports
import { ScreensModule } from './screens/screens.module';

// Custom Component Imports
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { ApiService } from './services/api.service';
import { SnackbarService } from './services/snackbar.service';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScreensModule,
  ],
  providers: [HttpService, ApiService, SnackbarService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
