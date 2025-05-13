import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { QlApi } from '../../common'
import { QlTodoList, QlTodoListCreate, QlTodoListUpdate } from '../models'


@Injectable({ providedIn: 'root' })
export class QlTodosApiClient {

    protected readonly baseUrl = `${QlApi.BASE_URL}/todo-lists`

    // DI
    protected readonly httpClient = inject(HttpClient)

    fetchAll(): Observable<QlTodoList[]> {
        return this.httpClient.get<QlTodoList[]>(this.baseUrl)
    }

    fetchOneById(entityId: string): Observable<QlTodoList> {
        const url = `${this.baseUrl}/${entityId}`
        return this.httpClient.get<QlTodoList>(url)
    }

    update(entityId: string, update: Partial<QlTodoListUpdate>): Observable<QlTodoList> {
        const url = `${this.baseUrl}/${entityId}`
        return this.httpClient.patch<QlTodoList>(url, { ...update })
    }

    deleteOne(entityId: string): Observable<QlTodoList> {
        const url = `${this.baseUrl}/${entityId}`
        return this.httpClient.delete<QlTodoList>(url)
    }

    create(payload: QlTodoListCreate): Observable<QlTodoList> {
        return this.httpClient.post<QlTodoList>(this.baseUrl, { ...payload })
    }

}
