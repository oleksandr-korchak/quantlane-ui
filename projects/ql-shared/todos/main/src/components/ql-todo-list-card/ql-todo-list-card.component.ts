import { Component, computed, input, output } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatDivider } from '@angular/material/divider'
import { MatIcon } from '@angular/material/icon'
import { QlTodoList } from 'ql-api'


@Component({
    selector: 'ql-todo-list-card',
    templateUrl: './ql-todo-list-card.component.html',
    imports: [
        MatCard,
        MatCardContent,
        MatDivider,
        MatButton,
        MatIcon,
    ],
})
export class QlTodoListCardComponent {

    // inputs/outputs
    readonly entity = input.required<QlTodoList>()

    readonly delete = output<void>()
    readonly details = output<void>()

    // computed
    readonly itemsTotalCount = computed<number>(() => {
        return this.entity().items.length
    })

    readonly completedItemsTotalCount = computed<number>(() => {
        return this.entity().items.filter(item => item.isCompleted).length
    })

    readonly allItemsCompleted = computed<boolean>(() => {
        return this.itemsTotalCount() > 0 && this.itemsTotalCount() == this.completedItemsTotalCount()
    })

    onDeleteBtnClicked() {
        this.delete.emit()
    }

    onDetailsBtnClicked() {
        this.details.emit()
    }

}
