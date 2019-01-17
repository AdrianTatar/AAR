import { SurchargeCustomerRate } from './../../../../shared/models/surcharge-customer-rate';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SurchargeCustomersRateService {

  private surchargeCustomerUrl = '/surchargeCustomer';
  private readAllPath = '/readAll';
  private savePath = '/create';
  private updatePath = '/update';

  constructor(private http: HttpClient) { }

  public getSurchargeCustomersRates() {
    return this.http.get<SurchargeCustomerRate[]>(this.surchargeCustomerUrl + this.readAllPath);
  }

  public createSurchargeCustomerRates(surchargeCustomerRate) {
    console.log(surchargeCustomerRate);
    return this.http.post<SurchargeCustomerRate>(this.surchargeCustomerUrl + this.savePath,
      JSON.stringify(surchargeCustomerRate), httpOptions)
      .subscribe(res => console.log(res));
  }

  public updateSurchargeCustomerRates(surchargeCustomerRate: SurchargeCustomerRate) {
    console.log(surchargeCustomerRate);
    console.log(JSON.stringify(surchargeCustomerRate));
    return this.http.put<SurchargeCustomerRate>(this.surchargeCustomerUrl + this.updatePath,
      JSON.stringify(surchargeCustomerRate), httpOptions)
      .subscribe(response => console.log(response));
  }
}
