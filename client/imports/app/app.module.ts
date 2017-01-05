import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './quizMaster/create/create.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';


import { routes } from './app.routes';
import { QuizMasterModule } from "./quizMaster/quizMaster.module";

@NgModule({
    // Components, Pipes, Directive
    declarations: [
        AppComponent,
        IndexComponent,
        ListComponent
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
        QuizMasterModule
    ],
    // Main Component
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
