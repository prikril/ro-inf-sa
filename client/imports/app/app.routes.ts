import { Route } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './quizMaster/create/create.component';
import { ListComponent } from './list/list.component';

export const routes: Route[] = [
    { path: '', component: IndexComponent },
    { path: 'list', component: ListComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
