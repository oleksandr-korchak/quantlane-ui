import { Injectable } from '@angular/core'
import { QlTodoList, QlTodoListCreate, QlTodoListUpdate, QlTodosApiClient } from 'ql-api'
import { StringHelpers } from 'ql-utils'
import { delay, Observable, of, switchMap, throwError } from 'rxjs'


@Injectable({ providedIn: 'root' })
export class QlTodosApiClientMock extends QlTodosApiClient {

    private readonly storageKey = 'qlTodoLists'

    // DI
    override fetchAll(): Observable<QlTodoList[]> {
        return of(this.loadDataFromStorage())
            .pipe(
                delay(100),
            )
    }

    override fetchOneById(entityId: string): Observable<QlTodoList> {
        return of(this.loadDataFromStorage().find(item => item.id === entityId)!)
            .pipe(
                switchMap((entity) =>
                    entity
                        ? of(entity)
                        : throwError(() => new Error(`Entity with id ${entityId} not found`)),
                ),
                delay(100),
            )
    }

    override update(entityId: string, update: Partial<QlTodoListUpdate>): Observable<QlTodoList> {
        let data = this.loadDataFromStorage()
        let refEntity = data.find(item => item.id === entityId)
        if (!refEntity) {
            return throwError(() => new Error(`Entity with id ${entityId} not found`))
        }

        data = data.map(item => {
            if (item.id === entityId) {
                refEntity = {
                    ...item,
                    ...update,
                }
                return refEntity
            }
            return item
        })

        this.saveDataToStorage(data)

        return of(refEntity)
            .pipe(
                delay(100),
            )
    }

    override create(payload: QlTodoListCreate): Observable<QlTodoList> {
        const data = this.loadDataFromStorage()
        const entity: QlTodoList = {
            ...payload,
            id: StringHelpers.guid(),
            items: [
                {
                    id: '123',
                    isCompleted: false,
                    createdAt: new Date().toISOString(),
                    title: 'Item #1',
                    completedAt: null,
                },
            ],
        }
        data.push(entity)
        this.saveDataToStorage(data)

        return of(entity)
            .pipe(
                delay(500),
            )
    }

    override deleteOne(entityId: string): Observable<QlTodoList> {
        let data = this.loadDataFromStorage()
        const refEntity = data.find(item => item.id === entityId)
        if (!refEntity) {
            return throwError(() => new Error(`Entity with id ${entityId} not found`))
        }

        data = data.filter(item => item.id !== entityId)

        this.saveDataToStorage(data)

        return of(refEntity)
            .pipe(
                delay(100),
            )
    }

    private saveDataToStorage(data: QlTodoList[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(data))
    }

    private loadDataFromStorage(): QlTodoList[] {
        const dataString = localStorage.getItem(this.storageKey)
        return dataString ? JSON.parse(dataString) as QlTodoList[] : []
    }

}
