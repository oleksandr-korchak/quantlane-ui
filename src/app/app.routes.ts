import { Routes } from '@angular/router'


export const routes: Routes = [
    {
        path: 'todos',
        loadChildren: () => import('../modules/home/ql-home.routes').then((r) => r.routes),
    },
    {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full',
    },
]
