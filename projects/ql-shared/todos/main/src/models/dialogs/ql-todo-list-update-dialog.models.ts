import { QlTodoListUpdateForm } from '../forms'

import Form = QlTodoListUpdateForm


export namespace QlTOdoListUpdateDialog {

    export type Data = {
        formData?: Partial<Form.FormData> | undefined
    }

}
