import { Component, inject, Signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { Store } from '@ngrx/store'
import { QlTodoList } from 'ql-api'
import { QlTodoListCardComponent, QlTodoListUpdateDialogService, QlTodosActions, QlTodosSelectors } from 'ql-shared/todos'
import { ProcessingStore } from 'ql-utils'

import StoreActions = QlTodosActions
import StoreSelectors = QlTodosSelectors


@Component({
    selector: 'ql-home-page',
    imports: [
        QlTodoListCardComponent,
        MatButton,
        MatIcon,
        ReactiveFormsModule,
        FormsModule,
    ],
    templateUrl: './ql-home-page.component.html',
})
export class QlHomePageComponent {

    readonly data: Signal<QlTodoList[]>

    readonly entitiesList: Signal<QlTodoList[]>
    readonly dataFetchingProcessing: Signal<ProcessingStore.EventProcessingState>

    // DI
    protected readonly store = inject(Store)
    protected readonly qlTodoListUpdateDialogService = inject(QlTodoListUpdateDialogService)

    constructor() {
        this.dataFetchingProcessing = this.store.selectSignal(StoreSelectors.selectFetchAllProcessing)
        this.entitiesList = this.store.selectSignal(StoreSelectors.selectAllTodoLists)

        this.store.dispatch(
            StoreActions.fetchAllRequestAction({}),
        )
    }

    onCreateBtnClicked() {
        this.qlTodoListUpdateDialogService.openDialog()
    }

    onTodoListDelete(entity: QlTodoList) {
        this.store.dispatch(
            StoreActions.deleteRequestAction({ id: entity.id }),
        )
    }

}
