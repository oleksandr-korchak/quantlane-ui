import { Component, inject, Signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { QlTodoItem, QlTodoList } from 'ql-api'
import { QlTodosActions, QlTodosSelectors } from 'ql-shared/todos'
import { ProcessingStore } from 'ql-utils'

import StoreActions = QlTodosActions
import StoreSelectors = QlTodosSelectors


@Component({
    selector: 'ql-todo-list-details-page',
    imports: [
        MatButton,
        MatIcon,
        ReactiveFormsModule,
        FormsModule,
        RouterLink,
    ],
    templateUrl: './ql-todo-list-details-page.component.html',
})
export class QlTodoListDetailsPageComponent {

    readonly dataFetchingProcessing: Signal<ProcessingStore.EventProcessingState>
    readonly refEntity: Signal<QlTodoList | undefined>

    // DI
    protected readonly store = inject(Store)
    protected readonly activatedRoute = inject(ActivatedRoute)

    get entityId(): string {
        return this.activatedRoute?.snapshot?.params?.['entityId']
    }

    constructor() {
        this.dataFetchingProcessing = this.store.selectSignal(StoreSelectors.selectFetchAllProcessing)
        this.refEntity = this.store.selectSignal(StoreSelectors.selectOneTotoList(this.entityId))

        this.store.dispatch(
            StoreActions.fetchAllRequestAction({}),
        )
    }

    onCreateBtnClicked() {
        // TODO: implement
    }

    onTodoItemDelete(entity: QlTodoItem) {
        // TODO: implement
    }

}
