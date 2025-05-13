import { HttpErrorResponse } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { concatLatestFrom, mapResponse } from '@ngrx/operators'
import { select, Store } from '@ngrx/store'
import { QlTodosApiClient } from 'ql-api'
import { delay, map, mergeMap, take } from 'rxjs'

import { QlTodosActions } from '../actions'
import { QlTodosSelectors } from '../selectors'

import StoreAction = QlTodosActions
import StoreSelectors = QlTodosSelectors


@Injectable()
export class QlTodosEffects {

    protected readonly store = inject(Store)
    protected readonly actions$ = inject(Actions)
    protected readonly qlTodosApiClient = inject(QlTodosApiClient)

    protected readonly fetchAllRequest$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(StoreAction.fetchAllRequestAction),
                concatLatestFrom(() => (this.store.pipe(select(StoreSelectors.selectIsAllDataFetched)))),
                mergeMap(([{ force }, isAllDataFetched]) => {
                    if (!force && isAllDataFetched) {
                        return this.store.pipe(select(StoreSelectors.selectAllTodoLists))
                            .pipe(
                                take(1),
                                map((entities) => StoreAction.fetchAllSuccessAction({ entities })),
                                delay(50),
                            )
                    }

                    return this.qlTodosApiClient.fetchAll()
                        .pipe(
                            mapResponse({
                                next: (entities) => (
                                    StoreAction.fetchAllSuccessAction({ entities })
                                ),
                                error: (error: HttpErrorResponse) => (
                                    StoreAction.fetchAllErrorAction({ error })
                                ),
                            }),
                        )
                }),
            ),
    )

    protected readonly createRequest$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(StoreAction.createRequestAction),
                mergeMap(({ create }) => {
                    return this.qlTodosApiClient.create(create)
                        .pipe(
                            mapResponse({
                                next: (entity) => (
                                    StoreAction.createSuccessAction({ entity })
                                ),
                                error: (error: HttpErrorResponse) => (
                                    StoreAction.createErrorAction({ error })
                                ),
                            }),
                        )
                }),
            ),
    )

    protected readonly updateRequest$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(StoreAction.updateRequestAction),
                mergeMap(({ id, update }) => {
                    return this.qlTodosApiClient.update(id, update)
                        .pipe(
                            mapResponse({
                                next: (entity) => (
                                    StoreAction.updateSuccessAction({ entity })
                                ),
                                error: (error: HttpErrorResponse) => (
                                    StoreAction.updateErrorAction({ error })
                                ),
                            }),
                        )
                }),
            ),
    )

}
