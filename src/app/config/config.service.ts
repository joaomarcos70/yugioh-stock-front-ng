import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ConfigService {

    baseUrl: string = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }

    get(endPoint: String) {
        return this.http.get(this.baseUrl + endPoint)
    }

    post(endPoint: String, body) {
        console.log("cheguei papito", body);
        return this.http.post(this.baseUrl + endPoint, body)
            .pipe(
                catchError(this.handleError)
            );

    }


}