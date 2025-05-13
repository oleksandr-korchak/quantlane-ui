import { QlDateTimeString } from '../../common'


export type QlTodoItem = {
    title: string
    isCompleted: boolean
    createdAt: QlDateTimeString
    completedAt: QlDateTimeString | null
}


