import { createFeatureSelector, createSelector } from '@ngrx/store'

import { QlTodosStore } from '../ql-todos.store'


export namespace QlTodosSelectors {

    export const selectFeature = createFeatureSelector<QlTodosStore.State>(QlTodosStore.FEATURE_NAME)

    export const selectFetchAllProcessing = createSelector(
        selectFeature,
        (state) => state.fetchAllProcessing,
    )

    export const selectIsAllDataFetched = createSelector(
        selectFeature,
        (state) => state.isAllDataFetched,
    )

    export const selectTodoListsState = createSelector(
        selectFeature,
        (state) => state.todoLists,
    )

    export const selectIds = createSelector(
        selectTodoListsState,
        (state) => state.ids,
    )

    export const selectEntities = createSelector(
        selectTodoListsState,
        (state) => state.entities,
    )

    export const selectAllTodoLists = createSelector(
        selectIds, selectEntities,
        (ids, entities) => ids.map(item => entities[item]!),
    )

    export const selectOneTotoList = (id: number) => createSelector(
        selectEntities,
        (entities) => entities[id],
    )

}

