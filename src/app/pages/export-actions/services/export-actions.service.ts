import { CookieService } from 'ngx-cookie-service';
import { ExportAction } from 'src/app/shared/models/export.action';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserActionsCreateService } from 'src/app/shared/services/user-actions-create.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Scenario } from './../../../shared/models/scenario';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ExportActionsService {

    constructor(private http: HttpClient,
        private cookieService: CookieService,
        private userActionsCreateService: UserActionsCreateService) { }

    private exportActionUrl = '/export';
    private readAllPath = '/distinct-exports-info';
    private readUserPath = '/distinct-exports-info-by-userid/';
    private readPath = '/scenarios-with-selling-rates-for-year';
    windowObject;

    public getallExports() {
        return this.http.get<ExportAction[]>(this.exportActionUrl + this.readAllPath).pipe(
            catchError(this.handleError)
        );
    }

    public getallUserExports() {
        return this.http.get<ExportAction[]>(this.exportActionUrl + this.readUserPath + this.cookieService.get('username')).pipe(
            catchError(this.handleError)
        );
    }

    public createExport(user) {
        this.userActionsCreateService.createUserAction('Generated New Export');
        return this.http.post<ExportAction>(this.exportActionUrl, user).pipe(
            catchError(this.handleError)
        );
    }

    public getScenarios(year: string) {
        return this.http.get<Scenario[]>(this.exportActionUrl + this.readPath + '/' + year).pipe(
            catchError(this.handleError)
        );
    }

    public getXML(year: string, scenario: string) {
        this.windowObject = window.open(this.exportActionUrl + '/new/excel/' + year + '/'
            + scenario + '/' + this.cookieService.get('username'));
        return this.windowObject;
    }

    public getHost(year: string, scenario: string) {
        this.windowObject = window.open(this.exportActionUrl + '/new/hosttxt/' + year + '/'
            + scenario + '/' + this.cookieService.get('username'));
        return this.windowObject;
    }

    handleError(error) {
        let errorMessage = 'Error';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
