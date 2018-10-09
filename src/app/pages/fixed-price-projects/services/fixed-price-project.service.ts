import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FixedPriceProject } from '../../../shared/models/fixed.price.project';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FixedPriceProjectService {

  private fixedPriceProjectUrl='/fixedPriceProject';
  private readAllPath='/readAll';

  constructor(private http: HttpClient) { }

  public getFixedPriceProjects(){
    return this.http.get<FixedPriceProject[]>(this.fixedPriceProjectUrl+this.readAllPath);
  }

  public createFixedPriceProject(fixedPriceProject){
    return this.http.post<FixedPriceProject>(this.fixedPriceProjectUrl, fixedPriceProject);
  }
}
