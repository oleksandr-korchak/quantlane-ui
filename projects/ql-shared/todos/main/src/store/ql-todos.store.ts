import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { QlTodoList } from 'ql-api'
import { ProcessingStore } from 'ql-utils'

import { QlTodosActions } from './actions'

import StoreAction = QlTodosActions


export namespace QlTodosStore {

    export const FEATURE_NAME = 'todos'

    export type State = {
        todoLists: EntityState<QlTodoList>
        fetchAllProcessing: ProcessingStore.EventProcessingState
        fetchOneProcessing: ProcessingStore.EventProcessingState
        updateProcessing: ProcessingStore.EventProcessingState
        deleteProcessing: ProcessingStore.EventProcessingState
        isAllDataFetched: boolean
    }

    export const adapter: EntityAdapter<QlTodoList> = createEntityAdapter<QlTodoList>({
        selectId: (entity) => entity.id,
    })

    export const defaultState: State = {
        todoLists: adapter.getInitialState(),
        fetchAllProcessing: ProcessingStore.getDefaultProcessingState(),
        fetchOneProcessing: ProcessingStore.getDefaultProcessingState(),
        updateProcessing: ProcessingStore.getDefaultProcessingState(),
        deleteProcessing: ProcessingStore.getDefaultProcessingState(),
        isAllDataFetched: false,
    }

    export const reducer = createReducer(
        defaultState,
        on(StoreAction.fetchAllRequestAction, (state) => ({
            ...state,
            fetchAllProcessing: ProcessingStore.eventProcessingStart(state.fetchAllProcessing),
        })),
        on(StoreAction.fetchAllSuccessAction, (state, { entities }) => ({
            ...state,
            todoLists: adapter.setAll(entities, state.todoLists),
            fetchAllProcessing: ProcessingStore.eventProcessingFinish(state.fetchAllProcessing),
            isAllDataFetched: true,
        })),
        on(StoreAction.fetchAllErrorAction, (state, { error }) => ({
            ...state,
            todoLists: adapter.setAll([], state.todoLists),
            fetchAllProcessing: ProcessingStore.eventProcessingFinish(state.fetchAllProcessing, error),
            isAllDataFetched: false,
        })),
        on(StoreAction.createRequestAction, (state) => ({
            ...state,
            updateProcessing: ProcessingStore.eventProcessingFinish(state.updateProcessing),
        })),
        on(StoreAction.createSuccessAction, (state, { entity }) => ({
            ...state,
            todoLists: adapter.addOne(entity, state.todoLists),
            updateProcessing: ProcessingStore.eventProcessingFinish(state.updateProcessing),
        })),
        on(StoreAction.createErrorAction, (state, { error }) => ({
            ...state,
            updateProcessing: ProcessingStore.eventProcessingFinish(state.updateProcessing, error),
        })),
        on(StoreAction.updateRequestAction, (state) => ({
            ...state,
            updateProcessing: ProcessingStore.eventProcessingFinish(state.updateProcessing),
        })),
        on(StoreAction.updateSuccessAction, (state, { entity }) => ({
            ...state,
            todoLists: adapter.updateOne({ id: entity.id, changes: entity }, state.todoLists),
            updateProcessing: ProcessingStore.eventProcessingFinish(state.updateProcessing),
        })),
        on(StoreAction.updateErrorAction, (state, { error }) => ({
            ...state,
            updateProcessing: ProcessingStore.eventProcessingFinish(state.updateProcessing, error),
        })),
        on(StoreAction.deleteRequestAction, (state) => ({
            ...state,
            deleteProcessing: ProcessingStore.eventProcessingFinish(state.deleteProcessing),
        })),
        on(StoreAction.deleteSuccessAction, (state, { entity }) => ({
            ...state,
            todoLists: adapter.removeOne(entity.id, state.todoLists),
            deleteProcessing: ProcessingStore.eventProcessingFinish(state.deleteProcessing),
        })),
        on(StoreAction.deleteErrorAction, (state, { error }) => ({
            ...state,
            deleteProcessing: ProcessingStore.eventProcessingFinish(state.deleteProcessing, error),
        })),
    )
}
