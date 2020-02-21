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

    public apps(): Observable<any> {

        const url = this.sessionConfig.serverUrl + this.appRes;
        const request: any = {};

        return this.http.get(url, request)
            .pipe(
                map(response => {
                    return response['data'];
                })
            );
    }

    public appUpdate(app: Application): Observable<any> {
        const url = this.sessionConfig.serverUrl + this.appRes + '/' + app.id;
        const request: any = {};

        return this.http.put(url, app, request);
    }

    public appCreate(app: Application): Observable<any> {
        const url = this.sessionConfig.serverUrl + this.appRes;
        const request: any = {};

        return this.http.post(url, app, request);
    }

    public appDelete(id: string): Observable<any> {

        const url = this.sessionConfig.serverUrl + this.appRes + '/' + id;
        const request: any = {};

        return this.http.delete(url, request);
    }

}
