import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { provideRouter, withComponentInputBinding } from '@angular/router'

import { routes } from './app.routes'


export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
    ],
}
