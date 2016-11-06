import { Route } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';

export const routes: Route[] = [
    { path: '', component: IndexComponent },
    { path: 'create', component: CreateComponent }
];
