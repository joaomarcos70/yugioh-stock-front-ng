import { Component, OnInit } from '@angular/core'
import { LoginService } from 'src/app/services/login.service'
import { Router } from '@angular/router'
import { Login } from 'src/app/models/Login.model'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    body = new Login()
    isRememberPassword: boolean = false
    showPassword: boolean = false

    constructor(private loginservice: LoginService, private router: Router) {}

    ngOnInit() {
        this.revealPassword()
    }

    sendtoBack() {
        this.loginservice.verifyLogin(this.body).subscribe(res => {
            this.router.navigate(['/home'])
        })
    }

    changeRememberPass() {
      console.log(this.isRememberPassword = !this.isRememberPassword);
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
