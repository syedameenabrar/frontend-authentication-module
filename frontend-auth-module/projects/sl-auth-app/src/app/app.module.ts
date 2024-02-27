import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlAuthLibraryModule } from 'sl-auth-library';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlAuthLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
