import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { wso2Header } from '../../app/variables';
import { wso2HeaderStudent, wso2ServiceBaseUrl } from '../../../environments/environment';

/**
 Generated class for the Wso2ServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Wso2Service {
    nbCalls = 0;
    private token = '';
    private tokenStudent = '';
    headers: HttpHeaders;

    constructor(public http: HttpClient) {
        this.getAppToken()
            .subscribe(
                data => {
                    this.headers = new HttpHeaders({'Authorization': this.token});
                    this.headers.append('Accept', 'application/json');
                });
    }

    /*Load wso2 service*/
    load(url: string): Observable<any> {
        const finalUrl = wso2ServiceBaseUrl + url;
        return this.http.get(finalUrl, {headers: this.headers}).pipe(
            map(res => {
                this.nbCalls = 0;
                return res;
            }),
            catchError((error) => {
                this.nbCalls++;
                if (this.nbCalls >= 10) {
                    this.nbCalls = 0;
                    return;
                }
                if (error.status === 401) {
                    this.getAppToken();
                    return this.load(url);
                } else {
                    return observableThrowError(new Error(error.status));
                }
            })
        );
    }

    getAppToken() {
        const body = new HttpParams().set('grant_type', 'client_credentials');
        return this.getToken(body);
    }

    login(user: string, pass: string) {
        const body = new HttpParams().set('grant_type', 'password').set('username', user).set('password', pass);
        return this.getToken(body, true);
    }

    getToken(body: HttpParams, login?: boolean) {
        const headers = new HttpHeaders({'Authorization': wso2HeaderStudent});
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const finalUrl = wso2ServiceBaseUrl + 'token';
        return this.http.post(
            finalUrl,
            body,
            {headers: headers}
        ).pipe(
            map(res => {
                if (login) {
                    this.tokenStudent = 'Bearer ' + res['access_token'];
                } else {
                    this.token = 'Bearer ' + res['access_token'];
                }
                return 'OK';
            }),
            catchError((error: any) => observableThrowError(error)));
    }

    loadStudent(url: string) {
        const headers = new HttpHeaders({'Authorization': this.tokenStudent});
        headers.append('Accept', 'application/json');
        const finalUrl = wso2ServiceBaseUrl + url;
        return this.http.get(finalUrl, {headers: headers}).pipe(map(res => res));
    }
}
