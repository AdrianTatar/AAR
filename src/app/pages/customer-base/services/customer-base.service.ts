import { CustomerBase } from '../../../shared/models/customerbase';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerBaseService {

  private customerBaseUrl = '/customerBase';
  private readAllPath = '/readAll';
  private savePath = '/create';
  private updatePath = '/update';

  constructor(private http: HttpClient) { }

  public getCustomerBase() {
    return this.http.get<CustomerBase[]>(this.customerBaseUrl + this.readAllPath);
  }

  public createCustomerBase(customerBase) {
    console.log(customerBase);
    return this.http.post<CustomerBase>(this.customerBaseUrl + this.savePath,
      JSON.stringify(customerBase), httpOptions)
      .subscribe(res => console.log(res));
  }

  public updateCustomerBase(customerBase: CustomerBase) {
    console.log(customerBase);
    console.log(JSON.stringify(customerBase));
    return this.http.put<CustomerBase>(this.customerBaseUrl + this.updatePath,
      JSON.stringify(customerBase), httpOptions)
      .subscribe(response => console.log(response));
  }
}
