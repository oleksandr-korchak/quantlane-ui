import { Component, input, output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatCheckbox } from '@angular/material/checkbox'
import { MatDivider } from '@angular/material/divider'
import { MatIcon } from '@angular/material/icon'
import { QlTodoItem } from 'ql-api'


@Component({
    selector: 'ql-todo-item-card',
    templateUrl: './ql-todo-item-card.component.html',
    imports: [
        MatCard,
        MatCardContent,
        MatDivider,
        MatButton,
        MatIcon,
        MatCheckbox,
        FormsModule,
    ],
})
export class QlTodoItemCardComponent {

    // inputs/outputs
    readonly entity = input.required<QlTodoItem>()

    readonly completedStateChanged = output<boolean>()
    readonly delete = output<void>()
    readonly edit = output<void>()

    onCompletedToggle(value: boolean) {
        this.completedStateChanged.emit(value)
    }

    onDeleteBtnClicked() {
        this.delete.emit()
    }

    onEditBtnClicked() {
        this.edit.emit()
    }

}
