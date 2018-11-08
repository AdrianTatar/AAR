import { Scenario } from './../../../shared/models/scenario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserActionsCreateService } from '../../../shared/services/user-actions-create.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ExportService {

  private exportUrl = '/export';
  private readPath = '/getScenariosForYear';

  constructor(
    private http: HttpClient,
    private userActionsCreateService: UserActionsCreateService
  ) { }

  public getScenarios(year: string) {
    return this.http.get<Scenario[]>(this.exportUrl + this.readPath + '/' + year);
  }

  public getXML(year: string, name: string) {
    this.userActionsCreateService.createUserAction('GenerateAAR');
    return this.http.get<Scenario[]>(this.exportUrl + '/' + year + '/' + name);
  }
}
