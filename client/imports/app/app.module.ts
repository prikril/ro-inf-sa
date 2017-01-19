import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { routes } from './app.routes';
import { QuizMasterModule } from "./quizMaster/quizMaster.module";
import {CompetitorModule} from "./competitor/competitor.module";
import { ChartsModule } from 'ng2-charts';

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        AppComponent,
        HomeComponent
    ],
    // Entry Components
    entryComponents: [
        AppComponent
    ],
    // Providers
    providers: [],
    // Modules
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(routes),
        QuizMasterModule,
        CompetitorModule,
        ChartsModule
    ],
    // Main Component
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
