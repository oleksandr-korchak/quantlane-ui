import { QlDateTimeString } from '../../common'


export type QlTodoItem = {
    id: string
    title: string
    isCompleted: boolean
    createdAt: QlDateTimeString
    completedAt: QlDateTimeString | null
}


