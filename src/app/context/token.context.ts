import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class TokenContext {
    private $token: BehaviorSubject<string> = new BehaviorSubject<string>(
        localStorage.getItem('token') ? localStorage.getItem('token') : null
    )

    get token() {
        return `Bearer ${this.$token.value}`
    }

    set token(token: string) {
        this.$token.next(token)
        if (token) {
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
        }
    }
}
