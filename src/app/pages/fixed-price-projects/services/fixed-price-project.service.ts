import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FixedPriceProject } from '../../../shared/models/fixed-price-project';
import { UserActionsCreateService } from '../../../shared/services/user-actions-create.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FixedPriceProjectService {

  private fixedPriceProjectUrl = '/fixed-price-projects';
  constructor(
    private http: HttpClient,
    private userActionsCreateService: UserActionsCreateService
  ) { }

  public getFixedPriceProjects() {
    return this.http.get<FixedPriceProject[]>(this.fixedPriceProjectUrl);
  }

  public createFixedPriceProject(fixedPriceProject) {
    this.userActionsCreateService.createUserAction('FPPCreate');
    return this.http.post<FixedPriceProject>(this.fixedPriceProjectUrl,
      JSON.stringify(fixedPriceProject), httpOptions)
      .subscribe(res => console.log(res));
  }

  public updateFixedPriceProject(fixedPriceProject: FixedPriceProject) {
    this.userActionsCreateService.createUserAction('FPPEdit');
    return this.http.put<FixedPriceProject>(this.fixedPriceProjectUrl,
      JSON.stringify(fixedPriceProject), httpOptions)
      .subscribe(response => console.log(response));
  }
}
