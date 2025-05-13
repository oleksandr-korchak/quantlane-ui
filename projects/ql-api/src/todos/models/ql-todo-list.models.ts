import { QlTodoItem } from './ql-todo-item.models'


export type QlTodoList = {
    id : string
    title: string
    description: string
    items: QlTodoItem[]
}

export type QlTodoListCreate = {
    title: string
    description: string | null
}

export type QlTodoListUpdate = {
    title: string
    description: string | null
    items: QlTodoItem[]
}
