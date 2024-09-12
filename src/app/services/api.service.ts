import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { CardInterface, RootObject } from '../interfaces/cardSearch.interface'
import { Observable } from 'rxjs'
import { TokenContext } from '../context/token.context'

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiUrl = environment.apiBaseUrl

    constructor(private http: HttpClient, private tokenContext: TokenContext) {}

    getCards(query: CardInterface) {
        let params = new HttpParams()

        Object.keys(query).forEach(function (key) {
            const value = query[key]
            if (value !== undefined && value !== '') {
                params = params.append(key, value)
            }
        })
        return this.http.get<RootObject>(`${this.apiUrl}/api/get-cards`, {
            params: params,
            headers: {
                Authorization: this.tokenContext.token
            }
        })
    }

    nextOrPrev(query: string): Observable<RootObject> {
        return this.http.get<RootObject>(`${this.apiUrl}/api/next-or-prev`, {
            headers: {
                Authorization: this.tokenContext.token,
                query
            }
        })
    }
}
