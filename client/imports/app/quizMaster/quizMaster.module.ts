import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ManageComponent } from './manage/manage.component';
import { StartComponent } from './start/start.component';
import { ListComponent } from './list/list.component';
import { BarChartComponent } from './manage/barchart/barchart.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import { ChartsModule } from 'ng2-charts';
import {LeaderboardComponent} from "./manage/leaderboard/leaderboard.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'master/create', component: CreateComponent },
            { path: 'master/manage/:gameNumber', component: ManageComponent },
            { path: 'master/manage/:gameNumber', component: ManageComponent },
            { path: 'master/start/:quizId', component: StartComponent },
            { path: 'master/list', component: ListComponent}
        ]),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule.forRoot(),
        BrowserModule,
        ChartsModule
    ],
    exports: [],
    declarations: [
        CreateComponent,
        ManageComponent,
        StartComponent,
        ListComponent,
        BarChartComponent,
        LeaderboardComponent
    ],
    providers: [],
})
export class QuizMasterModule { }
