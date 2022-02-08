import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RootObject } from '../interfaces/listModel.interface';


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



    post(endPoint: String, body) {
        return this.http.post(this.baseUrl + endPoint, body)
            .pipe(
                catchError(this.handleError)
            );

    }

    get(endPoint: String){
        return this.http.get<RootObject>(this.baseUrl + endPoint)
        .pipe(
            catchError(this.handleError)
        );
    }

    getWithQueryParams(endPoint: String, params){
        return this.http.get<RootObject>(this.baseUrl + endPoint ,{params:params})
        .pipe(
            catchError(this.handleError)
        );
    }

    getWithparams(endPoint: String, flag){
        return this.http.get<RootObject>(this.baseUrl + endPoint, {params:flag})
        .pipe(
            catchError(this.handleError)
        );
    }


}