import { AfterViewInit, Component, EventEmitter, inject, Input, OnDestroy, Output, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatCardHeader, MatCardTitle } from '@angular/material/card'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { Subject } from 'rxjs'

import { QlTodoListUpdateFormComponent } from '../../forms'
import { QlTOdoListUpdateDialog, QlTodoListUpdateForm } from '../../models'

import Dialog = QlTOdoListUpdateDialog
import Form = QlTodoListUpdateForm


@Component({
    selector: 'ql-todo-list-update-dialog',
    templateUrl: './ql-todo-list-update-dialog.component.html',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButton,
        MatCardTitle,
        QlTodoListUpdateFormComponent,
        MatCardHeader,
    ],
})
export class QlTodoListUpdateDialogComponent implements AfterViewInit, OnDestroy {

    @Input() isProcessing = false
    @Input() processingError: string | null = null

    @Output() submit$ = new EventEmitter<Form.FormData>()

    @ViewChild(QlTodoListUpdateFormComponent)
    readonly qlTodoListUpdateFormComponent: QlTodoListUpdateFormComponent

    readonly destroyed$ = new Subject<void>()

    // DI
    readonly dialogData = inject<Dialog.Data>(MAT_DIALOG_DATA)

    formGroup: FormGroup<Form.FormGroupControls>

    ngAfterViewInit(): void {
        this.formGroup = this.qlTodoListUpdateFormComponent.formGroup
    }

    ngOnDestroy(): void {
        this.destroyed$.next()
        this.destroyed$.complete()
    }

    onSubmitBtnClicked(): void {
        this.processingError = null
        const data = this.formGroup.value as Form.FormData
        this.submit$.emit(data)
    }


}
