import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { cardSearch } from '../models/CardSearch.model'
import { RootObject, CardInterface } from '../interfaces/cardSearch.interface'
import { Observable, Observer, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class YGOservice {
    constructor(private http: HttpClient) {}

    apiYgo: string = environment.apiYgo

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error)
        } else {
            console.error(`Backend returned code ${error.status}, body was: `, error.error)
        }
        return throwError('Something bad happened; please try again later.')
    }

    get(query: CardInterface) {
        let params = new HttpParams()

        Object.keys(query).forEach(function (key) {
            params = params.append(key, query[key])
        })
        return this.http.get<RootObject>(this.apiYgo, { params: params }).pipe(catchError(this.handleError))
    }

    nextOrPrev(query: string): Observable<RootObject> {
        return this.http.get<RootObject>(query)
    }
}
