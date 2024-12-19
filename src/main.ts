import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import {
  VERSION as MAT_VERSION,
  MatNativeDateModule,
} from '@angular/material/core';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(MatNativeDateModule),
  ],
}).catch((err) => console.error(err));
