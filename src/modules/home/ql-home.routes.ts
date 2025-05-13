import { Routes } from '@angular/router'

import { QlTodoListDetailsPageComponent, QlTodoListsBoardPageComponent } from './pages'


export const routes: Routes = [
    {
        path: 'board',
        component: QlTodoListsBoardPageComponent,
    },
    {
        path: 'details/:entityId',
        component: QlTodoListDetailsPageComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'board',
    },
]
