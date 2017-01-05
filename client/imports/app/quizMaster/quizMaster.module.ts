import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ManageComponent } from './manage/manage.component';
import { StartComponent } from './start/start.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'master/create', component: CreateComponent },
            { path: 'master/manage', component: ManageComponent },
            { path: 'master/start', component: StartComponent },
            { path: 'master', component: IndexComponent}
        ]),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule.forRoot(),
        BrowserModule
    ],
    exports: [],
    declarations: [
        CreateComponent,
        ManageComponent,
        StartComponent,
        IndexComponent
    ],
    providers: [],
})
export class QuizMasterModule { }
