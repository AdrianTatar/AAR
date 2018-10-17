import { PayerNode } from './../../../shared/models/payernode';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PayerNodeService {

  private payerNodeUrl = '/payerNode';
  private readAllPath = '/readAll';
  private savePath = '/create';
  private updatePath = '/update';

  constructor(private http: HttpClient) { }

  public getPayerNodes() {
    return this.http.get<PayerNode[]>(this.payerNodeUrl + this.readAllPath);
  }

  public createPayerNode(payerNode) {
    console.log(payerNode);
    return this.http.post<PayerNode>(this.payerNodeUrl + this.savePath,
      JSON.stringify(payerNode), httpOptions)
      .subscribe(response => console.log(response));
  }

  public updatePayerNode(payerNode: PayerNode) {
    console.log(payerNode);
    return this.http.put<PayerNode>(this.payerNodeUrl + this.updatePath,
      JSON.stringify(payerNode), httpOptions)
      .subscribe(response => console.log(response));
  }
}
