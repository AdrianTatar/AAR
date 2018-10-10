import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FixedPriceProject } from '../../../shared/models/fixed.price.project';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FixedPriceProjectService {

  private fixedPriceProjectUrl = '/fixedPriceProject';
  private readAllPath = '/readAll';
  private savePath = '/create';
  private updatePath = '/update';

  constructor(private http: HttpClient) { 
    this.http
  }

  public getFixedPriceProjects() {
    return this.http.get<FixedPriceProject[]>(this.fixedPriceProjectUrl + this.readAllPath);
  }

  public createFixedPriceProject(fixedPriceProject) {
    console.log(fixedPriceProject);
    return this.http.post<FixedPriceProject>(this.fixedPriceProjectUrl + this.savePath, JSON.stringify(fixedPriceProject), httpOptions)
    .subscribe(res => console.log(res));
  }

  public updateFixedPriceProject(fixedPriceProject: FixedPriceProject) {
    console.log(fixedPriceProject);  
    console.log(JSON.stringify(fixedPriceProject));  
    return this.http.put<FixedPriceProject>("http://localhost:8080/aarREST/rest/fixedPriceProject/update", 
      JSON.stringify(fixedPriceProject), httpOptions)
    .subscribe(response => console.log(response));
  }
}
