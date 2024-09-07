import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { UserContext } from '../context/user.context'

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private router: Router, private userContext: UserContext) {}

    canActivate(): boolean {
        if (localStorage.getItem('token') != null && !this.tokenIsExpired()) {
            this.router.navigate(['/home'])
            return false
        }
        return true
    }

    tokenIsExpired(): boolean {
        const now = Date.now().valueOf() / 1000
        const exp = this.userContext.user?.exp
        return !exp || exp < now
    }
}
