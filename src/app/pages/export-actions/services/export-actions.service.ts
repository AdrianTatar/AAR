import { CookieService } from 'ngx-cookie-service';
import { ExportAction } from 'src/app/shared/models/export.actions';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserActionsCreateService } from 'src/app/shared/services/user-actions-create.service';

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
    private readAllPath = '/getExportsList';
    private readUserPath = '/getExportsList/';

    public getallExports() {
        return this.http.get<ExportAction[]>(this.exportActionUrl + this.readAllPath);
    }

    public getallUserExports() {
        return this.http.get<ExportAction[]>(this.exportActionUrl + this.readUserPath + this.cookieService.get('username'));
    }

    public createExport(user) {
        this.userActionsCreateService.createUserAction('Generated New Export');
        return this.http.post<ExportAction>(this.exportActionUrl, user);
    }
}
