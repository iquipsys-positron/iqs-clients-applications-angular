import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Application } from '../models/application.data';
import { IqsSessionConfigService } from 'iqs-libs-clientshell2-angular';

@Injectable()
export class ApplicationDataService {

    private appRes = '/api/v1/applications';
    public constructor(
        private http: HttpClient,
        private sessionConfig: IqsSessionConfigService
    ) { }

    private handleError(response: Response) {
        const error = response.json();
        return Observable.throw(error);
    }

    public apps(): Observable<any> {

        const url = this.sessionConfig.serverUrl + this.appRes;
        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response['data'];
                }),
                catchError(this.handleError)
            );
    }

    public appUpdate(app: Application): Observable<any> {
        const url = this.sessionConfig.serverUrl + this.appRes + '/' + app.id;
        const request: any = {};

        return this.http.put(url, app, request)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public appCreate(app: Application): Observable<any> {
        const url = this.sessionConfig.serverUrl + this.appRes;
        const request: any = {};

        return this.http.post(url, app, request)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public appDelete(id: string): Observable<any> {

        const url = this.sessionConfig.serverUrl + this.appRes + '/' + id;
        const request: any = {};

        return this.http.delete(url, request)
            .pipe(
                map(response => {
                    return id;
                }),
                catchError(this.handleError)
            );
    }

}
