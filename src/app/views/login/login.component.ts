import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  body = new Login()



  constructor(private loginservice: LoginService,
    private router: Router) { }

  ngOnInit() {
  }

  sendtoBack() {
    this.loginservice.verifyLogin(this.body).subscribe(res => {
      this.router.navigate(['/home'])
    })
  }
}
