import { ExportAction } from './../../../shared/models/export.actions';
import { Scenario } from './../../../shared/models/scenario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserActionsCreateService } from '../../../shared/services/user-actions-create.service';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ExportService {
  private exportUrl = 'http://localhost:8080/aarREST/rest/export';
  private readPath = '/getScenariosForYear';

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private userActionsCreateService: UserActionsCreateService
  ) { }

  public getScenarios(year: string) {
    return this.http.get<Scenario[]>(this.exportUrl + this.readPath + '/' + year);
  }

  public getXML(year: string, scenario: string) {
    window.open(this.exportUrl + '/' + year + '/' + scenario + '/' + this.cookieService.get('username'));
  }
}
