import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonDisplayComponent } from './button-display/button-display.component';

import { ButtonModule } from '@progress/kendo-angular-buttons';


@NgModule({
  declarations: [
    AppComponent,
    ButtonDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AgGridModule.withComponents([ButtonDisplayComponent]), // Add all cell renderer components to this collection
    ButtonsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
