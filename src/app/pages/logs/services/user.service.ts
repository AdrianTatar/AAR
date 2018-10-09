import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAction } from '../../../shared/models/user.actions';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private userActionUrl = '/userAction';
  private readAllPath='/readAll';

  public getUsers() {  
    return this.http.get<UserAction[]>(this.userActionUrl + this.readAllPath);
  }

  public createUser(user) {
    return this.http.post<UserAction>(this.userActionUrl, user);
  }
}
