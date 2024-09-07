import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { UserContext } from '../context/user.context'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userContext: UserContext) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('token') != null && !this.tokenIsExpired()) {
            return true
        } else {
            this.router.navigate(['/login'])
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            return false
        }
    }

    tokenIsExpired(): boolean {
        const now = Date.now().valueOf() / 1000
        const exp = this.userContext.user.exp

        if (exp < now) {
            return true
        } else {
            return false
        }
    }
}
