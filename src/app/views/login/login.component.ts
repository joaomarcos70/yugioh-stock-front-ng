import { Component, OnInit } from '@angular/core'
import { IResponseLogin, LoginService } from 'src/app/services/login.service'
import { Router } from '@angular/router'
import { Login } from 'src/app/models/Login.model'
import { ClientService } from 'src/app/services/client.service'
import { IUser, UserContext } from 'src/app/context/user.context'
import { TokenContext } from 'src/app/context/token.context'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    body = new Login()
    isRememberPassword: boolean = false
    showPassword: boolean = true

    constructor(
        private loginservice: LoginService,
        private router: Router,
        private clientService: ClientService,
        private userContext: UserContext,
        private tokenContext: TokenContext
    ) {}

    ngOnInit() {
        this.revealPassword()
    }

    sendtoBack() {
        this.loginservice.verifyLogin(this.body).subscribe({
            next: (response: IResponseLogin) => {
                localStorage.setItem('token', response.token)
                this.tokenContext.token = response.token

                this.clientService.decodeToken(response.token).subscribe((response: IUser) => {
                    this.userContext.user = response
                })
                this.router.navigate(['/home'])
            },
            error: error => {
                console.log('error', error)
            }
        })
    }

    changeRememberPass() {
        this.isRememberPassword = !this.isRememberPassword
    }

    revealPassword() {
        this.showPassword = !this.showPassword
        let inputPassword = document.getElementById('password')

        if (this.showPassword) {
            inputPassword.setAttribute('type', 'text')
            document.getElementById('openEye').style.display = 'none'
            document.getElementById('closeEye').style.display = 'block'
        } else {
            inputPassword.setAttribute('type', 'password')
            document.getElementById('openEye').style.display = 'block'
            document.getElementById('closeEye').style.display = 'none'
        }
    }
}
