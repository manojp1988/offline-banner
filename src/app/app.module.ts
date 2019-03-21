import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OfflineBannerModule } from 'offline-banner';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, OfflineBannerModule.forRoot('http://localhost:3000/health')],
  bootstrap: [AppComponent]
})
export class AppModule {}
