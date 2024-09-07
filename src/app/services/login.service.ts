import { Injectable } from '@angular/core'
import { ConfigService } from '../config/config.service'
import { Observable } from 'rxjs'

export interface IResponseLogin {
    message: string
    token: string
}

export interface ILogin {
    email: string
    password: string
}

@Injectable()
export class LoginService {
    constructor(private ConfigService: ConfigService) {}

    endPoint: string = '/auth/login'

    verifyLogin(bodyLogin: ILogin): Observable<IResponseLogin> {
        return this.ConfigService.post<IResponseLogin>(this.endPoint, bodyLogin)
    }
}
