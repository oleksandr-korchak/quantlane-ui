import { createAction, props } from '@ngrx/store'
import { QlTodoList, QlTodoListCreate, QlTodoListUpdate } from 'ql-api'


export namespace QlTodosActions {

    export enum ActionType {
        fetchAllRequest = '[TodoList] fetchAllRequest',
        fetchAllSuccess = '[TodoList] fetchAllSuccess',
        fetchAllError = '[TodoList] fetchAllError',
        createRequest = '[TodoList] createRequest',
        createSuccess = '[TodoList] createSuccess',
        createError = '[TodoList] createError',
        updateRequest = '[TodoList] updateRequest',
        updateSuccess = '[TodoList] updateSuccess',
        updateError = '[TodoList] updateError',
        deleteRequest = '[TodoList] deleteRequest',
        deleteSuccess = '[TodoList] deleteSuccess',
        deleteError = '[TodoList] deleteError',
    }

    export const fetchAllRequestAction = createAction(
        ActionType.fetchAllRequest,
        props<{ force?: boolean }>(),
    )

    export const fetchAllSuccessAction = createAction(
        ActionType.fetchAllSuccess,
        props<{ entities: QlTodoList[] }>(),
    )

    export const fetchAllErrorAction = createAction(
        ActionType.fetchAllError,
        props<{ error: Error }>(),
    )

    export const createRequestAction = createAction(
        ActionType.createRequest,
        props<{ create: QlTodoListCreate }>(),
    )

    export const createSuccessAction = createAction(
        ActionType.createSuccess,
        props<{ entity: QlTodoList }>(),
    )

    export const createErrorAction = createAction(
        ActionType.createError,
        props<{ error: Error }>(),
    )

    export const updateRequestAction = createAction(
        ActionType.updateRequest,
        props<{ id: string; update: Partial<QlTodoListUpdate> }>(),
    )

    export const updateSuccessAction = createAction(
        ActionType.updateSuccess,
        props<{ entity: QlTodoList }>(),
    )

    export const updateErrorAction = createAction(
        ActionType.updateError,
        props<{ error: Error }>(),
    )


    export const deleteRequestAction = createAction(
        ActionType.deleteRequest,
        props<{ id: string }>(),
    )

    export const deleteSuccessAction = createAction(
        ActionType.deleteSuccess,
        props<{ entity: QlTodoList }>(),
    )

    export const deleteErrorAction = createAction(
        ActionType.deleteError,
        props<{ error: Error }>(),
    )

}
