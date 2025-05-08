import { Routes } from '@angular/router'

import { QlHomePageComponent } from './pages'


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: QlHomePageComponent,
    },
]
