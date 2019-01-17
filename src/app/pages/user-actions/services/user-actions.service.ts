import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserAction } from '../../../shared/models/user-action';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  constructor(private http: HttpClient) { }

  private userActionUrl = '/userAction';
  private readAllPath = '/readAll';

  public getUsers() {
    console.log(this.userActionUrl);
    return this.http.get<UserAction[]>(this.userActionUrl + this.readAllPath);
  }

  public createUser(user) {
    return this.http.post<UserAction>(this.userActionUrl, user);
  }
}
