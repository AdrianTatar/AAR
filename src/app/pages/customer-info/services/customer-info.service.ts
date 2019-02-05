import { CustomerInfo } from '../../../shared/models/customer-info';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserActionsCreateService } from '../../../shared/services/user-actions-create.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerInfoService {

  private customerInfoUrl = '/customers-info';

  constructor(
    private http: HttpClient,
    private userActionsCreateService: UserActionsCreateService
  ) { }

  public getCustomerInfo() {
    return this.http.get<CustomerInfo[]>(this.customerInfoUrl);
  }

  public createCustomerInfo(customerBase) {
    this.userActionsCreateService.createUserAction('CustomerInfoCreate');
    return this.http.post<CustomerInfo>(this.customerInfoUrl,
      JSON.stringify(customerBase), httpOptions)
      .subscribe(res => console.log(res));
  }

  public updateCustomerInfo(customerInfo: CustomerInfo) {
    this.userActionsCreateService.createUserAction('CustomerInfoEdit');
    return this.http.put<CustomerInfo>(this.customerInfoUrl,
      JSON.stringify(customerInfo), httpOptions)
      .subscribe(response => console.log(response));
  }
}
