import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotFoundComponent } from './pages/not-found/not-found.component'
import { MainAppModule } from './modules/main-app/main-app.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainAppModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1500
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
