import { FormControl, FormGroup, Validators } from '@angular/forms'


export namespace QlTodoListUpdateForm {

    export enum FormField {
        title = 'title',
        description = 'description',
    }

    export type FormData = {
        title: string
        description: string | null
    }

    export type FormGroupControls = {
        [FormField.title]: FormControl<string | null>
        [FormField.description]: FormControl<string | null>
    }

    export function createFromGroup(formData?: Partial<FormData>): FormGroup<FormGroupControls> {
        return new FormGroup({
            [FormField.title]: new FormControl<string | null>(formData?.title || null, Validators.required),
            [FormField.description]: new FormControl<string | null>(formData?.description || null),
        })
    }


}
