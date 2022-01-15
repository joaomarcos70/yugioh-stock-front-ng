import { Injectable } from "@angular/core";
import { ConfigService } from "../config/config.service";



@Injectable()
export class LoginService {
    constructor(private ConfigService: ConfigService) { }

    endPoint: String = '/auth/login'

    verifyLogin(bodyLogin) {
        return this.ConfigService.post(this.endPoint, bodyLogin)
    }
}