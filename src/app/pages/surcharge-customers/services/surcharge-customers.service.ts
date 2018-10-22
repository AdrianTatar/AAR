import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SurchargeCustomer } from '../../../shared/models/surcharge.customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SurchargeCustomersService {

  private surchargeCustomerUrl = '/surchargeCustomer';
  private readAllPath = '/readAll';
  private savePath = '/create';
  private updatePath = '/update';

  constructor(private http: HttpClient) { }

  public getSurchargeCustomers() {
    return this.http.get<SurchargeCustomer[]>(this.surchargeCustomerUrl + this.readAllPath);
  }

  public createSurchargeCustomer(surchargeCustomer) {
    console.log(surchargeCustomer);
    return this.http.post<SurchargeCustomer>(this.surchargeCustomerUrl + this.savePath,
      JSON.stringify(surchargeCustomer), httpOptions)
    .subscribe(res => console.log(res));
  }

  public updateSurchargeCustomer(surchargeCustomer: SurchargeCustomer) {
    console.log(surchargeCustomer);
    console.log(JSON.stringify(surchargeCustomer));
    return this.http.put<SurchargeCustomer>(this.surchargeCustomerUrl + this.updatePath,
      JSON.stringify(surchargeCustomer), httpOptions)
    .subscribe(response => console.log(response));
  }
}
