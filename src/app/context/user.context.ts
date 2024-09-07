import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface IUser {
    id: string
    email: string
    name: string
    nick: string
    iat: number
    exp: number
}

@Injectable({ providedIn: 'root' })
export class UserContext {
    private $user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    )

    get user() {
        return this.$user.value
    }

    set user(user: IUser) {
        this.$user.next(user)
        localStorage.setItem('user', user ? JSON.stringify(user) : null)
    }
}
