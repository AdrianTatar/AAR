import { ExportAction } from 'src/app/shared/models/export.actions';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ExportActionsService {

    constructor(private http: HttpClient) { }

    private exportActionUrl = '/export';
    private readAllPath = '/getExportsList';
    private readUserPath = '/getExportList/test';

    public getallExports() {
        return this.http.get<ExportAction[]>(this.exportActionUrl + this.readAllPath);
    }

    public getallUserExports() {
        return this.http.get<ExportAction[]>(this.exportActionUrl + this.readUserPath);
    }

    public createExport(user) {
        return this.http.post<ExportAction>(this.exportActionUrl, user);
    }
}
