import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core'
import { MAT_CARD_CONFIG, MatCardConfig } from '@angular/material/card'
import { BrowserModule } from '@angular/platform-browser'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { environment } from '@env/environment'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { storeFreeze } from 'ngrx-store-freeze'
import { QlTodosApiClient } from 'ql-api'
import { provideQlTodosStore } from 'ql-shared/todos'
import { QlTodosApiClientMock } from 'ql-shared/todos/__mock__'

import { routes } from './app.routes'


export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        {
            provide: MAT_CARD_CONFIG,
            useValue: {
                appearance: 'outlined',
            } as MatCardConfig,
        },
        // NGRX
        provideStore(
            {},
            {
                metaReducers: !environment.production
                    ? [storeFreeze]
                    : [],
            }),
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping
            //  directly to that part of code
            trace: false,
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
            connectInZone: true, // If set to true, the connection is established within the Angular zone
        }),
        // ./NGRX
        {
            provide: QlTodosApiClient,
            useClass: QlTodosApiClientMock,
        },
        ...provideQlTodosStore(),
    ],
}
