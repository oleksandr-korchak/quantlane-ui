import { Routes } from '@angular/router'


export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('../modules/home/ql-home.routes').then((r) => r.routes),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',   
    },
]
