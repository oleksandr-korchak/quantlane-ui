import { Component, effect, input } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatError,
    MatFormField,
    MatFormFieldDefaultOptions,
    MatFormFieldModule,
    MatLabel,
} from '@angular/material/form-field'
import { MatInput, MatInputModule } from '@angular/material/input'

import { QlTodoListUpdateForm } from '../../models'

import Form = QlTodoListUpdateForm


@Component({
    selector: 'ql-todo-list-update-form',
    templateUrl: 'ql-todo-list-update-form.component.html',
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
                floatLabel: 'always',
            } as MatFormFieldDefaultOptions,
        },
    ],
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatError,
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class QlTodoListUpdateFormComponent {

    readonly formData = input<Partial<Form.FormData | undefined>>(undefined)

    readonly FormField = Form.FormField
    readonly formGroup: FormGroup<Form.FormGroupControls> = Form.createFromGroup()

    constructor() {
        effect(() => {
            this.formGroup.reset(this.formData() || {})
        })
    }

}
