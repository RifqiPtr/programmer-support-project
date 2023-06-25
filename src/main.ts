import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTE } from './app/app.route';
import { HttpService } from './app/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(
  AppComponent,
  { providers: [provideRouter(APP_ROUTE), HttpService, importProvidersFrom(HttpClientModule, BrowserAnimationsModule)]}
  );