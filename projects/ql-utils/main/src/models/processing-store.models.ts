export namespace ProcessingStore {

    export type EventProcessingState = {
        processing: boolean
        processingError: Error | null | unknown
    }

    export function getDefaultProcessingState(initProcessing = false): EventProcessingState {
        return {
            processing: initProcessing,
            processingError: null,
        }
    }

    export function eventProcessingStart(state: EventProcessingState): EventProcessingState {
        return {
            ...state,
            processing: true,
            processingError: null,
        }
    }

    export function eventProcessingFinish(state: EventProcessingState, error: null | unknown = null): EventProcessingState {
        return {
            ...state,
            processing: false,
            processingError: error,
        }
    }

    export function hasEventProcessingError(state: EventProcessingState): boolean {
        return state.processingError !== null
    }
}
