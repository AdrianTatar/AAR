import { CustomerBase } from '../../../shared/models/customerbase';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserActionsCreateService } from '../../../shared/services/user-actions-create.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerBaseService {

  private customerBaseUrl = '/customerBase';
  private readAllPath = '/readAll';
  private savePath = '/create';
  private updatePath = '/update';

  constructor(
    private http: HttpClient,
    private userActionsCreateService: UserActionsCreateService
  ) { }

  public getCustomerBase() {
    return this.http.get<CustomerBase[]>(this.customerBaseUrl + this.readAllPath);
  }

  public createCustomerBase(customerBase) {
    this.userActionsCreateService.createUserAction('CBCreate');
    return this.http.post<CustomerBase>(this.customerBaseUrl + this.savePath,
      JSON.stringify(customerBase), httpOptions)
      .subscribe(res => console.log(res));
  }

  public updateCustomerBase(customerBase: CustomerBase) {
    this.userActionsCreateService.createUserAction('CBEdit');
    return this.http.put<CustomerBase>(this.customerBaseUrl + this.updatePath,
      JSON.stringify(customerBase), httpOptions)
      .subscribe(response => console.log(response));
  }
}
