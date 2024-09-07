import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { UserContext } from '../context/user.context'
import { TokenContext } from '../context/token.context'

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    constructor(private http: HttpClient, private userContext: UserContext, private tokenContext: TokenContext) {}

    baseUrl = environment.apiBaseUrl

    decodeToken(token: string) {
        return this.http.get(`${this.baseUrl}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    getUserData() {
        return this.http.get(`${this.baseUrl}/users/getDataById`, {
            headers: {
                Authorization: `Bearer ${this.tokenContext.token}`,
                id: this.userContext.user.id
            }
        })
    }
}
