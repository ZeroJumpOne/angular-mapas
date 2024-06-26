import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsModule } from './maps/maps.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      MapsModule,
   ],
   providers: [
      provideHttpClient(withInterceptorsFromDi()),
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
