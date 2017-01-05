import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { StandbyComponent } from './standby/standby.component';
import { QuestionComponent } from './question/question.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'competitor/standby', component: StandbyComponent },
            { path: 'competitor/question', component: QuestionComponent }
        ]),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule.forRoot(),
        BrowserModule
    ],
    exports: [],
    declarations: [
        StandbyComponent,
        QuestionComponent
    ],
    providers: [],
})
export class CompetitorModule { }
