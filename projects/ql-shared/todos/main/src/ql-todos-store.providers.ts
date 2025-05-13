import { EnvironmentProviders } from '@angular/core'
import { provideEffects } from '@ngrx/effects'
import { provideState } from '@ngrx/store'

import { QlTodosEffects, QlTodosStore } from './store'


export function provideQlTodosStore(): EnvironmentProviders[] {
    return [
        provideState({
            name: QlTodosStore.FEATURE_NAME,
            reducer: QlTodosStore.reducer,
        }),
        provideEffects(
            QlTodosEffects,
        ),
    ]
}
