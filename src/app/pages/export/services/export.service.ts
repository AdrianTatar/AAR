import { ExportAction } from '../../../shared/models/export.action';
import { Scenario } from './../../../shared/models/scenario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserActionsCreateService } from '../../../shared/services/user-actions-create.service';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private exportAction = '/export';
  private exportUrl = 'http://localhost:8080/aarREST/rest/export';
  private readPath = '/scenarios-with-selling-rates-for-year';
  windowObject;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private userActionsCreateService: UserActionsCreateService
  ) { }

  public getScenarios(year: string) {
    return this.http.get<Scenario[]>(this.exportUrl + this.readPath + '/' + year);
  }

  public getXML(year: string, scenario: string) {
    this.windowObject = window.open(this.exportUrl + '/new/excel/' + year + '/' + scenario + '/' + this.cookieService.get('username'));
    return this.windowObject;
  }

  public getHost(year: string, scenario: string) {
    this.windowObject = window.open(this.exportUrl + '/new/hosttxt/' + year + '/' + scenario + '/' + this.cookieService.get('username'));
    return this.windowObject;
  }

  public createExport(user) {
    return this.http.post<ExportAction>(this.exportAction, user);
  }
}
