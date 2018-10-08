import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAction } from '../../../shared/models/user.actions';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // private userUrl = 'http://localhost:8080/aarREST/rest/userAction';
  private userUrl = '/userAction';

  public getUsers() {
    console.log('URL=' + this.userUrl);
    return this.http.get<UserAction[]>(this.userUrl + '/readAll');
  }

  public createUser(user) {
    return this.http.post<UserAction>(this.userUrl, user);
  }
}
