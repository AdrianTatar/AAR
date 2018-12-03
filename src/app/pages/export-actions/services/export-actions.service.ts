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

    private exportActionUrl = '/exportAction';
    private radAllPath = '/readAll';

    public getExports() {

    }

    public createExport() {

    }
}
