import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SurchargeCustomer } from '../../../shared/models/surcharge-custome';
import { UserActionsCreateService } from '../../../shared/services/user-actions-create.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SurchargeCustomersService {

  private surchargeCustomerUrl = '/surcharge-customers';

  constructor(
    private http: HttpClient,
    private userActionsCreateService: UserActionsCreateService
  ) { }

  public getSurchargeCustomers() {
    return this.http.get<SurchargeCustomer[]>(this.surchargeCustomerUrl);
  }

  public createSurchargeCustomer(surchargeCustomer) {
    this.userActionsCreateService.createUserAction('SCCreate');
    return this.http.post<SurchargeCustomer>(this.surchargeCustomerUrl,
      JSON.stringify(surchargeCustomer), httpOptions)
    .subscribe(res => console.log(res));
  }

  public updateSurchargeCustomer(surchargeCustomer: SurchargeCustomer) {
    this.userActionsCreateService.createUserAction('SCEdit');
    return this.http.put<SurchargeCustomer>(this.surchargeCustomerUrl,
      JSON.stringify(surchargeCustomer), httpOptions)
    .subscribe(response => console.log(response));
  }
}
