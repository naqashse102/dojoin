import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DigitOnly } from 'src/app/shared/directives/digitOnly.directive';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule
    ],
    declarations: [
        LoginComponent,
        HomeComponent,
        DigitOnly
    ],
})

export class MainAppModule {
}
