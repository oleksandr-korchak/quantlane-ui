import { inject, Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { QlTOdoListUpdateDialog, QlTodoListUpdateDialogComponent, QlTodosActions, QlTodosSelectors } from 'ql-shared/todos'
import { first, merge, of, takeUntil, tap } from 'rxjs'

import Dialog = QlTOdoListUpdateDialog
import StoreAction = QlTodosActions
import StoreSelectors = QlTodosSelectors


@Injectable({ providedIn: 'root' })
export class QlTodoListUpdateDialogService {

    protected dialogRef: MatDialogRef<QlTodoListUpdateDialogComponent>

    // DI
    protected readonly dialog = inject(MatDialog)
    protected readonly store = inject(Store)
    protected readonly actions$ = inject(Actions)

    constructor() {
        merge(
            this.actions$.pipe(ofType(StoreAction.createSuccessAction)),
            this.actions$.pipe(ofType(StoreAction.updateSuccessAction)),
        )
            .subscribe(() => {
                this.dialogRef.componentInstance.isProcessing = false
                this.dialogRef.close()
                // TODO: display some toastr
            })

        merge(
            this.actions$.pipe(ofType(StoreAction.createErrorAction)),
            this.actions$.pipe(ofType(StoreAction.updateErrorAction)),
        )
            .subscribe((error) => {
                this.dialogRef.componentInstance.isProcessing = false
                this.dialogRef.componentInstance.processingError = error.error.message
                // TODO: display some toastr
            })
    }

    openDialog(entityId?: number, options?: { isClone?: boolean }): void {
        const entity$ = entityId
            ? this.store.select(StoreSelectors.selectOneTotoList(entityId))
            : of(undefined)

        entity$
            .pipe(
                first(),
            )
            .subscribe((entity) => {

                const dialogData: Dialog.Data = {
                    formData: entity ? { title: entity.title, description: entity.description } : undefined,
                }

                this.dialogRef = this.dialog.open(
                    QlTodoListUpdateDialogComponent,
                    {
                        data: dialogData,
                        closeOnNavigation: true,
                        disableClose: true,
                        autoFocus: false,
                        width: '568px',
                    },
                )

                this.dialogRef.componentInstance.submit$
                    .pipe(
                        takeUntil(this.dialogRef.componentInstance.destroyed$),
                        tap(() => this.dialogRef.componentInstance.isProcessing = true),
                    )
                    .subscribe((formData) => {
                        if (entity && !options?.isClone) {
                            // update
                            this.store.dispatch(
                                StoreAction.updateRequestAction({
                                    id: entity.id,
                                    update: formData,
                                }),
                            )
                        }
                        else {
                            // create
                            const create = formData
                            this.store.dispatch(
                                StoreAction.createRequestAction({ create }),
                            )
                        }
                    })
            })
    }

}
