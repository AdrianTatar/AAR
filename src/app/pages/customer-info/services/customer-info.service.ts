import { CustomerInfo } from '../../../shared/models/customer-info';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserActionsCreateService } from '../../../shared/services/user-actions-create.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerInfoService {

  private customerInfoUrl = '/customerBase';
  private readAllPath = '/readAll';
  private savePath = '/create';
  private updatePath = '/update';

  constructor(
    private http: HttpClient,
    private userActionsCreateService: UserActionsCreateService
  ) { }

  public getCustomerInfo() {
    return this.http.get<CustomerInfo[]>(this.customerInfoUrl + this.readAllPath);
  }

  public createCustomerInfo(customerBase) {
    this.userActionsCreateService.createUserAction('CustomerInfoCreate');
    return this.http.post<CustomerInfo>(this.customerInfoUrl + this.savePath,
      JSON.stringify(customerBase), httpOptions)
      .subscribe(res => console.log(res));
  }

  public updateCustomerInfo(customerInfo: CustomerInfo) {
    this.userActionsCreateService.createUserAction('CustomerInfoEdit');
    return this.http.put<CustomerInfo>(this.customerInfoUrl + this.updatePath,
      JSON.stringify(customerInfo), httpOptions)
      .subscribe(response => console.log(response));
  }
}
