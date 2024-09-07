import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.apiBaseUrl

    decodeToken(token: string) {
        return this.http.get(`${this.baseUrl}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
