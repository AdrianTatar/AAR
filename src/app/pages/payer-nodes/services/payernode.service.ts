import { PayerNode } from './../../../shared/models/payernode';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserActionsCreateService } from '../../../shared/services/user-actions-create.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PayerNodeService {

  private payerNodeUrl = '/payer-nodes';

  constructor(
    private http: HttpClient,
    private userActionsCreateService: UserActionsCreateService
  ) { }

  public getPayerNodes() {
    return this.http.get<PayerNode[]>(this.payerNodeUrl);
  }

  public createPayerNode(payerNode) {
    this.userActionsCreateService.createUserAction('PNCreate');
    return this.http.post<PayerNode>(this.payerNodeUrl,
      JSON.stringify(payerNode), httpOptions)
      .subscribe(response => console.log(response));
  }

  public updatePayerNode(payerNode: PayerNode) {
    this.userActionsCreateService.createUserAction('PNEdit');
    return this.http.put<PayerNode>(this.payerNodeUrl,
      JSON.stringify(payerNode), httpOptions)
      .subscribe(response => console.log(response));
  }
}
